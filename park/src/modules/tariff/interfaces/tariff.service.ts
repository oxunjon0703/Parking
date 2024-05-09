import { ResData } from '../../../lib/resData';
import { TariffEntity } from '../entities/tariff.entity';
import { CreateTariffDto } from '../dto/create-tariff.dto';
import { UpdateTariffDto } from '../dto/update-tariff.dto';

export interface ITariffService {
  findAll(): Promise<ResData<Array<TariffEntity>>>;
  findOneById(id: number): Promise<ResData<TariffEntity | undefined>>;
  create(dto: CreateTariffDto): Promise<ResData<TariffEntity>>;
  updated(dto: UpdateTariffDto): Promise<ResData<TariffEntity>>;
  delete(id: number): Promise<ResData<TariffEntity | undefined>>;
}
