import { RpcException } from '@nestjs/microservices';

export class ParkNotFoundRpcException extends RpcException {
  constructor() {
    super('Park not found');
  }
}

export class ParkNameAlreadyRpcException extends RpcException {
  constructor() {
    super('Park name already exists');
  }
}
