import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { UserService } from '../user/user.service';
import { config } from '../../common/config';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: ['userDetail', 'user'],
          protoPath: [
            join(__dirname, '../../protos/user-detail.proto'),
            join(__dirname, '../../protos/user.proto'),
          ],
          url: config.userPort,
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService, UserService],
})
export class UserDetailModule {}
