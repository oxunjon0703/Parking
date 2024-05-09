import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AllExceptionsFilter } from './lib/rpc-exeptionFilter';
import { config } from './common/config/typeorm.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['park', 'layer', 'place', 'service', 'tariff'],
        protoPath: [
          join(__dirname, 'protos/park.proto'),
          join(__dirname, 'protos/layer.proto'),
          join(__dirname, 'protos/place.proto'),
          join(__dirname, 'protos/service.proto'),
          join(__dirname, 'protos/tariff.proto'),
        ],
        url: config.parkPort,
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();
}
bootstrap();
