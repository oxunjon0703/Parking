import { RpcException } from '@nestjs/microservices';

export class TariffNotFoundRpcException extends RpcException {
  constructor() {
    super('Tariff not found');
  }
}
