import { Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { ResData } from '../../lib/resData';
import { TariffRepository } from './tariff.repository';
import { TariffEntity } from './entities/tariff.entity';
import { TariffNotFoundRpcException } from './exception/tariff.exception';
import { ITariffService } from './interfaces/tariff.service';

@Injectable()
export class TariffService implements ITariffService {
  constructor(private readonly repository: TariffRepository) {}

  async findAll(): Promise<ResData<TariffEntity[]>> {
    const Tariffs = await this.repository.findAll();

    return new ResData('get all Tariffs', 200, Tariffs);
  }

  async findOneById(id: number): Promise<ResData<TariffEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new TariffNotFoundRpcException();
    }

    return new ResData('get by id Tariff', 200, foundData);
  }

  async create(dto: CreateTariffDto): Promise<ResData<TariffEntity>> {
    const newTariff = new TariffEntity();

    Object.assign(newTariff, dto);

    const newTariffEntity = await this.repository.insert(newTariff);

    return new ResData('success', 200, newTariffEntity);
  }

  async updated(dto: UpdateTariffDto): Promise<ResData<TariffEntity>> {
    const { data: foundTariff } = await this.findOneById(dto.id);

    if (!foundTariff) {
      throw new TariffNotFoundRpcException();
    }

    const updateTariff = await this.repository.update(dto);

    return new ResData('updated', 201, updateTariff);
  }

  async delete(id: number): Promise<ResData<TariffEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new TariffNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
