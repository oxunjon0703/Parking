import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffController } from './tariff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffEntity } from './entities/tariff.entity';
import { TariffRepository } from './tariff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TariffEntity])],
  controllers: [TariffController],
  providers: [TariffService, TariffRepository],
})
export class TariffModule {}
