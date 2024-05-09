import { RpcException } from '@nestjs/microservices';

export class TransactionNotFoundRpcException extends RpcException {
  constructor() {
    super('Transaction not found_$_400');
  }
}

// export class TransactionNotFoundRpcException extends RpcException {
//   constructor() {
//     super({ message: 'Transaction not found', code: 400 });
//   }
// }
