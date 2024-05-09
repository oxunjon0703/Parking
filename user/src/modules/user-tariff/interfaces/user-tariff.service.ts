import { ResData } from '../../../lib/resData';
import { CreateUserTariffDto } from '../dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from '../dto/update-user-tariff.dto';
import { UserTariffEntity } from '../entities/user-tariff.entity';

export interface IUserTariffService {
  findAll(): Promise<ResData<Array<UserTariffEntity>>>;
  findOneById(id: number): Promise<ResData<UserTariffEntity | undefined>>;
  findOneByPhone(phone: string): Promise<ResData<UserTariffEntity | undefined>>;
  create(dto: CreateUserTariffDto): Promise<ResData<UserTariffEntity>>;
  updated(dto: UpdateUserTariffDto): Promise<ResData<UserTariffEntity>>;
  delete(id: number): Promise<ResData<UserTariffEntity | undefined>>;
}
