import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
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
          package: ['layer', 'park'],
          protoPath: [
            join(__dirname, '../../protos/layer.proto'),
            join(__dirname, '../../protos/park.proto'),
          ],
          url: config.parkPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [LayerController],
  providers: [LayerService, ParkService],
})
export class LayerModule {}
