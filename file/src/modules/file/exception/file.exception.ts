import { RpcException } from '@nestjs/microservices';

export class FileNotFoundRpcException extends RpcException {
  constructor() {
    super('File not found');
  }
}
