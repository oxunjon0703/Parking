import { Module } from '@nestjs/common';
import { LayerService } from './layer.service';
import { LayerController } from './layer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerEntity } from './entities/layer.entity';
import { LayerRepository } from './layer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LayerEntity])],
  controllers: [LayerController],
  providers: [LayerService, LayerRepository],
})
export class LayerModule {}
