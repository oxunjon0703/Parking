import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PARK_PACKAGE,
  TRANSACTION_PACKAGE,
} from '../../common/consts/microservices';
import { join } from 'path';
import { ShotService } from '../shot/shot.service';
import { ServiceService } from '../service/service.service';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['transaction', 'shot'],
          protoPath: [
            join(__dirname, '../../protos/transaction.proto'),
            join(__dirname, '../../protos/shot.proto'),
          ],
          url: config.transactionPort,
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['service'],
          protoPath: [join(__dirname, '../../protos/service.proto')],
          url: config.parkPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, ShotService, ServiceService],
})
export class TransactionModule {}
