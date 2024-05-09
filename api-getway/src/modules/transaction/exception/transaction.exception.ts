import { HttpException, HttpStatus } from '@nestjs/common';

export class TransferNotMoneyException extends HttpException {
  constructor() {
    super(
      'You cannot transfer money to your own account',
      HttpStatus.BAD_REQUEST,
    );
  }
}
