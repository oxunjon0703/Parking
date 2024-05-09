import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { ParkService } from '../park/park.service';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['tariff', 'park'],
          protoPath: [
            join(__dirname, '../../protos/tariff.proto'),
            join(__dirname, '../../protos/park.proto'),
          ],
          url: config.parkPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [TariffController],
  providers: [TariffService, ParkService],
})
export class TariffModule {}
