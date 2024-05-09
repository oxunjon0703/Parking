import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { ParkService } from '../park/park.service';
import { UserService } from '../user/user.service';
import { TariffService } from '../tariff/tariff.service';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['service', 'park', 'tariff'],
          protoPath: [
            join(__dirname, '../../protos/service.proto'),
            join(__dirname, '../../protos/park.proto'),
            join(__dirname, '../../protos/tariff.proto'),
          ],
          url: config.parkPort,
        },
      },
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../protos/user.proto'),
          url: config.userPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ParkService, UserService, TariffService],
})
export class ServiceModule {}
