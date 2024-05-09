import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { config } from '../../common/config';
import { TariffService } from '../tariff/tariff.service';
import { UserService } from '../user/user.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['userTariff', 'user'],
          protoPath: [
            join(__dirname, '../../protos/user-tariff.proto'),
            join(__dirname, '../../protos/user.proto'),
          ],
          url: config.userPort,
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['tariff'],
          protoPath: [join(__dirname, '../../protos/tariff.proto')],
          url: config.parkPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [UserTariffController],
  providers: [UserTariffService, UserService, TariffService],
})
export class UserTariffModule {}
