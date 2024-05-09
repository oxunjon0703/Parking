import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { LayerService } from '../layer/layer.service';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['place', 'layer'],
          protoPath: [
            join(__dirname, '../../protos/place.proto'),
            join(__dirname, '../../protos/layer.proto'),
          ],
          url: config.parkPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [PlaceController],
  providers: [PlaceService, LayerService],
})
export class PlaceModule {}
