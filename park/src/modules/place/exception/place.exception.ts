import { RpcException } from '@nestjs/microservices';

export class PlaceNotFoundRpcException extends RpcException {
  constructor() {
    super('Place not found');
  }
}
