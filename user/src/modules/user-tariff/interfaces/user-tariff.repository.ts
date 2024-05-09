import { UpdateUserTariffDto } from '../dto/update-user-tariff.dto';
import { UserTariffEntity } from '../entities/user-tariff.entity';

export interface IUserTariffRepository {
  findAll(): Promise<Array<UserTariffEntity>>;
  findOneById(id: number): Promise<UserTariffEntity | undefined>;
  insert(dto: UserTariffEntity): Promise<UserTariffEntity>;
  update(dto: UpdateUserTariffDto): Promise<UserTariffEntity>;
  delete(id: number): void;
}
