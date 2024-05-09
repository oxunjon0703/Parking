import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSACTION_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'shot',
          protoPath: join(__dirname, '../../protos/shot.proto'),
          url: config.transactionPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [ShotController],
  providers: [ShotService],
})
export class ShotModule {}
