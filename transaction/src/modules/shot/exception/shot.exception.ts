import { RpcException } from '@nestjs/microservices';

export class ShotNotFoundRpcException extends RpcException {
  constructor() {
    super('Shot not found');
  }
}
