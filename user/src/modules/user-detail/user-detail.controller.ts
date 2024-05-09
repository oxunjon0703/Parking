import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';

@Controller()
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @GrpcMethod('UserDetailService', 'Create')
  async create(@Payload() createUserDetailDto: CreateUserDetailDto) {
    return await this.userDetailService.create(createUserDetailDto);
  }

  @GrpcMethod('UserDetailService', 'FindAll')
  async findAll() {
    return await this.userDetailService.findAll();
  }

  @GrpcMethod('UserDetailService', 'FindOne')
  async findOne(data: { id: number }) {
    return await this.userDetailService.findOneById(data.id);
  }

  @GrpcMethod('UserDetailService', 'Update')
  async update(@Payload() updateUserDetailDto: UpdateUserDetailDto) {
    return await this.userDetailService.updated(updateUserDetailDto);
  }

  @GrpcMethod('UserDetailService', 'Delete')
  async remove(data: { id: number }) {
    return await this.userDetailService.delete(data.id);
  }
}
