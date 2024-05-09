import { RpcException } from '@nestjs/microservices';

export class ServiceNotFoundRpcException extends RpcException {
  constructor() {
    super('Service not found');
  }
}
