import { InjectRepository } from '@nestjs/typeorm';
import { TariffEntity } from './entities/tariff.entity';
import { Repository } from 'typeorm';
import { ITariffRepository } from './interfaces/tariff.repository';
import { UpdateTariffDto } from './dto/update-tariff.dto';

export class TariffRepository implements ITariffRepository {
  constructor(
    @InjectRepository(TariffEntity)
    private repository: Repository<TariffEntity>,
  ) {}
  async findAll(): Promise<Array<TariffEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<TariffEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: TariffEntity): Promise<TariffEntity> {
    const newTariff = this.repository.create(entity);

    await this.repository.save(newTariff);

    return newTariff;
  }

  async update(dto: UpdateTariffDto): Promise<TariffEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
