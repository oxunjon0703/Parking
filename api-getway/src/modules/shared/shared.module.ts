import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE } from '../../common/consts/microservices';
import { join } from 'path';
import { config } from '../../common/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: config.jwtExpiredIn },
    }),
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
    ]),
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class SharedModule {}
