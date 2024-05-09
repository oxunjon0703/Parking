import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Create')
  async create(@Payload() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: { id: number }) {
    return await this.userService.findOneById(data.id);
  }

  @GrpcMethod('UserService', 'FindOnePhone')
  async findOnePhone(data: { phone: string }) {
    return await this.userService.findOneByPhone(data.phone);
  }

  @GrpcMethod('UserService', 'Update')
  async update(data: UpdateUserDto) {
    return await this.userService.updated(data);
  }

  @GrpcMethod('UserService', 'Delete')
  async remove(data: { id: number }) {
    return await this.userService.delete(data.id);
  }
}
