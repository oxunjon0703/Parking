import { Module } from '@nestjs/common';
import { ParkModule } from './modules/park/park.module';
import { PlaceModule } from './modules/place/place.module';
import { TariffModule } from './modules/tariff/tariff.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { UserTariffModule } from './modules/user-tariff/user-tariff.module';
import { ShotModule } from './modules/shot/shot.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LayerModule } from './modules/layer/layer.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { config } from './common/config';
import { SharedModule } from './modules/shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: config.redisHost, port: config.redisPort },
          ttl: 60 * 60 * 1000 /** 1 soat */,
        });
        return { store };
      },
    }),
    AuthModule,
    FileModule,
    UserModule,
    UserDetailModule,
    UserTariffModule,
    ParkModule,
    LayerModule,
    PlaceModule,
    TariffModule,
    ServiceModule,
    ShotModule,
    TransactionModule,
    SharedModule,
  ],
})
export class AppModule {}
