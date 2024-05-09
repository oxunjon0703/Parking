import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { USER_PACKAGE } from '../../common/consts/microservices';

@Injectable()
export class UserTariffService {
  private userTariffService: any;

  constructor(@Inject(USER_PACKAGE) private UserTariffClient: ClientGrpc) {}

  onModuleInit() {
    this.userTariffService =
      this.UserTariffClient.getService('UserTariffService');
  }
  async create(createUserTariffDto: CreateUserTariffDto) {
    return await this.userTariffService.Create(createUserTariffDto);
  }

  findAll() {
    return this.userTariffService.findAll({});
  }

  findOne(id: number) {
    return this.userTariffService.findOne({ id });
  }

  async update(id: number, updateUserTariffDto: UpdateUserTariffDto) {
    const dto = { id: id, ...updateUserTariffDto };

    return await this.userTariffService.Update(dto);
  }

  async remove(id: number) {
    return await this.userTariffService.Delete({ id });
  }
}
