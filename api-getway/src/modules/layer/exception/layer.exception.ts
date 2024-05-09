import { HttpException, HttpStatus } from '@nestjs/common';

export class LayerNameOrFloorException extends HttpException {
  constructor() {
    super('must be name or floor', HttpStatus.BAD_REQUEST);
  }
}
