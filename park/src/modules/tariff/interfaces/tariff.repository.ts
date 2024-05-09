import { CreateTariffDto } from '../dto/create-tariff.dto';
import { UpdateTariffDto } from '../dto/update-tariff.dto';
import { TariffEntity } from '../entities/tariff.entity';

export interface ITariffRepository {
  findAll(): Promise<Array<TariffEntity>>;
  findOneById(id: number): Promise<TariffEntity | undefined>;
  insert(dto: CreateTariffDto): Promise<TariffEntity>;
  update(dto: UpdateTariffDto): Promise<TariffEntity>;
  delete(id: number): void;
}
