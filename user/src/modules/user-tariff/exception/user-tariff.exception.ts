import { RpcException } from '@nestjs/microservices';

export class UserTariffNotFoundRpcException extends RpcException {
  constructor() {
    super('userTariff not found');
  }
}
