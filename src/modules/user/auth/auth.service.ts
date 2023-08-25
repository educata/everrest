import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { EncryptionService, ExceptionService } from 'src/shared';
import { SignUpDto } from '../dtos';
import { User as UserInterface } from 'src/interfaces';
import { AuthExpectionKeys, ExceptionStatusKeys, UserRole } from 'src/enums';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from 'src/modules/mail';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private exceptionService: ExceptionService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
    private mailService: MailService,
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

    // ! TODO: Serialize user response object (to hide password)
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
      chatIds: [],
      cartID: '',
      role: UserRole.Default,
      verified: false,
    });

    return user;
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
      // ! TODO: Serialize user response object (to hide password)
      return user;
    }
    return null;
  }

  async signIn(user: UserInterface, response: Response) {
    const payload = this.createPayload(user);
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    response.cookie('access_token', accessToken, {
      expires: new Date(
        Date.now() + Number(process.env.JWT_EXPIRES_IN) * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
    });
    response.cookie('refresh_token', refreshToken, {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_EXPIRES_IN) * 7 * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
    });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  refreshToken(user: UserInterface, response: Response) {
    const accessToken = this.jwtService.sign(this.createPayload(user));
    response.cookie('access_token', accessToken, {
      expires: new Date(
        Date.now() + Number(process.env.JWT_EXPIRES_IN) * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: true,
    });
    return {
      access_token: accessToken,
    };
  }

  async test() {
    await this.mailService.sendEmail({
      email: 'kdautinishvili@gmail.com',
      template: './test',
      subject: 'test',
      context: {
        name: 'test',
      },
    });
    return 'email sent';
  }
}
