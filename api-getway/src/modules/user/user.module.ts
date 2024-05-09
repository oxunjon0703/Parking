import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PARK_PACKAGE, USER_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../common/config';
import { ParkService } from '../park/park.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../protos/user.proto'),
          url: config.userPort,
        },
      },
      {
        name: PARK_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'park',
          protoPath: join(__dirname, '../../protos/park.proto'),
          url: config.parkPort,
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService, ParkService],
})
export class UserModule {}
