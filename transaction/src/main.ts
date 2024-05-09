import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './lib/rpc-exeptionFilter';
import { join } from 'path';
import { config } from './common/config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['shot', 'transaction'],
        protoPath: [
          join(__dirname, 'protos/shot.proto'),
          join(__dirname, 'protos/transaction.proto'),
        ],
        url: config.transactionPort,
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
