import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.BAD_REQUEST);
  }
}

export class OwnerMustHaveParkIdException extends HttpException {
  constructor() {
    super('owner must have park ID', HttpStatus.BAD_REQUEST);
  }
}
