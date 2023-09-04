import { Injectable } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { ExceptionStatusKeys, GlobalExceptionKeys } from 'src/enums';
import mongoose from 'mongoose';

@Injectable()
export class MongooseValidatorService {
  constructor(private exceptionService: ExceptionService) {}

  isValidObjectId(...ids: string[]) {
    ids.forEach((id) => {
      mongoose.isValidObjectId(id) || this.throwInvalidId();
    });
  }

  private throwInvalidId() {
    this.exceptionService.throwError(
      ExceptionStatusKeys.BadRequest,
      'Ivalid mongoose object id',
      GlobalExceptionKeys.IncorrectMongooseID,
    );
  }
}
