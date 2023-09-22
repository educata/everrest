import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Response } from 'express';
import { User, UserDocument } from 'src/schemas';
import {
  EncryptionService,
  ExceptionService,
  MongooseValidatorService,
} from 'src/shared';
import { User as UserInterface, UserPayload } from 'src/interfaces';
import {
  AuthExpectionKeys,
  ExceptionStatusKeys,
  UserRole,
  AuthActions,
} from 'src/enums';
import { MailService } from 'src/modules/mail';
import { SignUpDto, UpdateUserDto, UpdateUserPasswordDto } from '../dtos';
import {
  generateVerifyPageTemplate,
  generateResetPageTemplate,
} from 'src/modules/mail/templates';
import { API_CONFIG } from 'src/consts';

@Injectable()
export class AuthService {
  private readonly BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private exceptionService: ExceptionService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
    private mailService: MailService,
    private mongooseValidator: MongooseValidatorService,
  ) {}

  async signUp(body: SignUpDto) {
    const userExsists = await this.userModel.findOne({ email: body.email });
    if (userExsists) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'Email is already in use',
        AuthExpectionKeys.EmailInUse,
      );
    }

    const hashedPassword = await this.encryptionService.hash(body.password);

    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
      chatIds: [],
      cartID: '',
      role: UserRole.Default,
      verified: false,
    });

    this.verifyEmail(user.email, true);

    return this.createPayload(user as unknown as UserInterface);
  }

  private createPayload(user: UserInterface) {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      address: user.address,
      role: user.role,
      zipcode: user.zipcode,
      avatar: user.avatar,
      gender: user.gender,
      phone: user.phone,
      verified: user.verified,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (
      user &&
      (await this.encryptionService.compareHash(password, user.password))
    ) {
      return this.createPayload(user as unknown as UserInterface);
    }
    return null;
  }

  async signIn(user: UserPayload, response: Response) {
    const accessToken = this.jwtService.sign(user);
    const refreshToken = this.jwtService.sign(user, { expiresIn: '7d' });
    response.cookie('access_token', accessToken, {
      expires: new Date(
        Date.now() + Number(process.env.JWT_EXPIRES_IN) * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    response.cookie('refresh_token', refreshToken, {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_EXPIRES_IN) * 7 * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(response: Response) {
    let refreshToken = response.getHeader('refresh_token') as string;
    if (!refreshToken) {
      refreshToken = response.req.cookies['refresh_token'];
    }
    const data = this.jwtService.decode(refreshToken) as UserPayload;
    const user = await this.userModel.findOne({ email: data.email });
    const accessToken = this.jwtService.sign(
      this.createPayload(user as unknown as UserInterface),
    );
    response.cookie('access_token', accessToken, {
      expires: new Date(
        Date.now() + Number(process.env.JWT_EXPIRES_IN) * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return {
      access_token: accessToken,
    };
  }

  async verifyEmail(email: string, isFromSignUp = false) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      if (user.verified) {
        this.exceptionService.throwError(
          ExceptionStatusKeys.BadRequest,
          `User with this '${email}' already verified`,
          AuthExpectionKeys.AlreadyVerified,
        );
      } else {
        await this.mailService.sendEmail({
          email: user.email,
          template: './verify',
          subject: 'Verify account',
          context: {
            showExpireTime: !isFromSignUp,
            name: user.firstName,
            link: `${this.BASE_URL}/auth/verify/${this.jwtService.sign(
              {
                email,
                action: AuthActions.Verify,
              },
              { expiresIn: isFromSignUp ? '10y' : '1h' },
            )}`,
          },
        });
      }
    }

    return {
      status: 200,
      message:
        'If we find the email in the database, we will send a verify mail',
    };
  }

  async generateDocument(token: string) {
    const result = await this.getResultWhileDecodeFromURL(token);

    const user = await this.userModel.findOne({ email: result.email });

    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `User with this '${result.email}' does not exists`,
        AuthExpectionKeys.TokenContainsIncorrectUser,
      );
    }

    return generateVerifyPageTemplate(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      `${this.BASE_URL}/auth/submit/${this.jwtService.sign({
        email: user.email,
        action: AuthActions.Submit,
      })}`,
    );
  }

  async submitEmailToken(token: string) {
    const result = await this.getResultWhileDecodeFromURL(token);

    const user = await this.userModel.findOne({ email: result.email });

    if (user) {
      if (result.action === AuthActions.Submit) {
        if (user.verified) {
          return { success: false, message: 'User already verified' };
        } else {
          user.verified = true;
          user.save();
          return { success: true, message: 'User successfully verified' };
        }
      } else {
        return { success: false, message: 'Incorrect action' };
      }
    } else {
      return { success: false, message: 'User not found' };
    }
  }

  private async getResultWhileDecodeFromURL(token: string) {
    let result: {
      email: string;
      iat: number;
      exp: number;
      action: string;
    };

    try {
      result = await this.jwtService.verifyAsync(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
    } catch (err) {
      const errorName = err.name || '';
      if (errorName === 'TokenExpiredError') {
        this.exceptionService.throwError(
          ExceptionStatusKeys.BadRequest,
          `Token expired, expired at: "${err.expiredAt}"`,
          AuthExpectionKeys.TokenExpired,
        );
      } else {
        this.exceptionService.throwError(
          ExceptionStatusKeys.BadRequest,
          'Invalid token',
          AuthExpectionKeys.TokenInvalid,
        );
      }
    }

    return result;
  }

  async recoveryPassword(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      if (user.verified) {
        await this.mailService.sendEmail({
          email: user.email,
          template: './recovery',
          subject: 'Recovery password',
          context: {
            name: user.firstName,
            email: user.email,
            link: `${this.BASE_URL}/auth/recovery/${this.jwtService.sign(
              {
                email,
                action: AuthActions.Recovery,
              },
              { expiresIn: '15m' },
            )}`,
          },
        });
      }
    }

    return {
      status: 200,
      message:
        'If we find the verified email in the database, we will send a recovery mail',
    };
  }

  async generatePasswordReset(token: string) {
    const result = await this.getResultWhileDecodeFromURL(token);

    if (result.action !== AuthActions.Recovery) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Incorrect action, wrong path usage`,
        AuthExpectionKeys.TokenContainsIncorrectAction,
      );
    }

    const randomPassword = this.encryptionService.generateRandomPassword(10);
    const hashedPassword = await this.encryptionService.hash(randomPassword);

    const user = await this.userModel.findOne({ email: result.email });

    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `User with this '${result.email}' does not exists`,
        AuthExpectionKeys.TokenContainsIncorrectUser,
      );
    }

    user.password = hashedPassword;
    await user.save();

    await this.mailService.sendEmail({
      email: user.email,
      template: './recovery-result',
      subject: 'Recovery password result',
      context: {
        name: user.firstName,
        password: randomPassword,
      },
    });

    return generateResetPageTemplate(user.email);
  }

  async updateUser(userPayload: UserPayload, body: UpdateUserDto) {
    if (
      !body.firstName &&
      !body.lastName &&
      !body.age &&
      !body.email &&
      !body.address &&
      !body.phone &&
      !body.zipcode &&
      !body.avatar &&
      !body.gender
    ) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Nothing to update, provide at least one property`,
        AuthExpectionKeys.NothingToUpdate,
      );
    }
    const user = await this.userModel.findOneAndUpdate(
      { email: userPayload.email },
      {
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        email: body.email,
        address: body.address,
        phone: body.phone,
        zipcode: body.zipcode,
        avatar: body.avatar,
        gender: body.gender,
      },
    );

    const updatedUser = await this.userModel.findOne({ _id: user.id });

    return this.createPayload(updatedUser as unknown as UserInterface);
  }

  async updateUserPassword(
    userPayload: UserPayload,
    body: UpdateUserPasswordDto,
    response: Response,
  ) {
    if (body.newPassword === body.oldPassword) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Old and new passwords can not be same`,
        AuthExpectionKeys.ChangePasswordsMatch,
      );
    }

    const user = await this.userModel.findOne({ email: userPayload.email });
    const isCorrect = await this.encryptionService.compareHash(
      body.oldPassword,
      user.password,
    );

    if (!isCorrect) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Old password is incorrect`,
        AuthExpectionKeys.OldPasswordIncorrect,
      );
    }

    user.password = body.newPassword;
    await user.save();

    return this.signIn(
      this.createPayload(user as unknown as UserInterface),
      response,
    );
  }

  async deleteCurrentUser(userPayload: UserPayload) {
    const user = await this.userModel.findOneAndDelete({
      email: userPayload.email,
    });

    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `User already deleted`,
        AuthExpectionKeys.UserAlreadyDeleted,
      );
    }

    return {
      acknowledged: true,
    };
  }

  async getUserByID(userPayload: UserPayload, id: string) {
    if (userPayload._id === id) {
      return this.createPayload(userPayload as unknown as UserInterface);
    }

    this.mongooseValidator.isValidObjectId(id);
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `User with this '${id}' does not exist`,
        AuthExpectionKeys.UserNotFound,
      );
    }

    return this.createPayload(user as unknown as UserInterface);
  }

  async getAllUser(query: { page_index: number; page_size: number }) {
    const currentPage = query.page_index || API_CONFIG.MINIMUM_PAGE_INDEX;
    const responsePerPage = query.page_size || API_CONFIG.RESPONSE_PER_PAGE;
    const skip = responsePerPage * (Math.floor(currentPage) - 1);
    const users = await this.userModel
      .find({})
      .sort({ firstName: 1 })
      .limit(responsePerPage)
      .skip(skip);
    const usersCount = await this.userModel.countDocuments({});
    return {
      total: usersCount,
      limit: responsePerPage,
      page: currentPage,
      skip,
      users: users.map((user) => {
        return this.createPayload(user as unknown as UserInterface);
      }),
    };
  }
}
