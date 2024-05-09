import { Module } from '@nestjs/common';
import { ShotService } from './shot.service';
import { ShotController } from './shot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShotEntity } from './entities/shot.entity';
import { ShotRepository } from './shot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShotEntity])],
  controllers: [ShotController],
  providers: [ShotService, ShotRepository],
})
export class ShotModule {}
