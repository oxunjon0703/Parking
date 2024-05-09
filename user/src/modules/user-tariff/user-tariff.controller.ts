import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';

@Controller()
export class UserTariffController {
  constructor(private readonly userTariffService: UserTariffService) {}

  @GrpcMethod('UserTariffService', 'Create')
  create(@Payload() createUserTariffDto: CreateUserTariffDto) {
    return this.userTariffService.create(createUserTariffDto);
  }

  @GrpcMethod('UserTariffService', 'FindAll')
  findAll() {
    return this.userTariffService.findAll();
  }

  @GrpcMethod('UserTariffService', 'FindOne')
  findOne(data: { id: number }) {
    return this.userTariffService.findOneById(data.id);
  }

  @GrpcMethod('UserTariffService', 'Update')
  update(@Payload() updateUserTariffDto: UpdateUserTariffDto) {
    return this.userTariffService.updated(updateUserTariffDto);
  }

  @GrpcMethod('UserTariffService', 'Delete')
  remove(data: { id: number }) {
    return this.userTariffService.delete(data.id);
  }
}
