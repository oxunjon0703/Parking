import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailEntity } from './entities/user-detail.entity';
import { UserDetailRepository } from './user-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailEntity])],
  controllers: [UserDetailController],
  providers: [UserDetailService, UserDetailRepository],
})
export class UserDetailModule {}
