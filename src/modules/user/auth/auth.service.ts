import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { EncryptionService, ExceptionService } from 'src/shared';
import { SignInDto, SignUpDto } from '../dtos';
import { AuthExpectionKeys, ExceptionStatusKeys, UserRole } from 'src/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private exceptionService: ExceptionService,
    private encryptionService: EncryptionService,
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

    // TODO: Serialize user response object (to hide password)
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
      chatIds: [],
      cartID: '',
      role: UserRole.Default,
    });

    return user;
  }

  async signIn(body: SignInDto) {}
}
