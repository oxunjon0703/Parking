import { RpcException } from '@nestjs/microservices';

export class LayerNotFoundRpcException extends RpcException {
  constructor() {
    super('Layer not found_$_400');
  }
}
