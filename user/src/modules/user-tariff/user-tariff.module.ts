import { Module } from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { UserTariffController } from './user-tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTariffRepository } from './user-tariff.repository';
import { UserTariffEntity } from './entities/user-tariff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTariffEntity])],
  controllers: [UserTariffController],
  providers: [UserTariffService, UserTariffRepository],
})
export class UserTariffModule {}
