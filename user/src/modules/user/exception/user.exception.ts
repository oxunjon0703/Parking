import { RpcException } from '@nestjs/microservices';

export class UserNotFoundRpcException extends RpcException {
  constructor() {
    super('user not found_$_400');
  }
}

export class UserNotPhoneRpcException extends RpcException {
  constructor() {
    super('user not phone_$_404');
  }
}
