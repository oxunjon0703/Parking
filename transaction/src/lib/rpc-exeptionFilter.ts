import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (!(exception instanceof RpcException)) {
      exception = new RpcException(exception.message);
    }
    return super.catch(exception, host);
  }
}
