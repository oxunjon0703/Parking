import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginOrPasswordWrongException extends HttpException {
  constructor() {
    super('User Phone or Password Wrong!', HttpStatus.BAD_REQUEST);
  }
}
