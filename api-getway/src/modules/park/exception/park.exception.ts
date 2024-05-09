import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNOtOwnerException extends HttpException {
  constructor() {
    super('the user is not the owner', HttpStatus.BAD_REQUEST);
  }
}
