import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ShotModule } from './modules/shot/shot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TransactionModule,
    ShotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
