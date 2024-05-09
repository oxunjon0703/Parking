import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTariffEntity } from './entities/user-tariff.entity';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { IUserTariffRepository } from './interfaces/user-tariff.repository';

export class UserTariffRepository implements IUserTariffRepository {
  constructor(
    @InjectRepository(UserTariffEntity)
    private repository: Repository<UserTariffEntity>,
  ) {}
  async findAll(): Promise<Array<UserTariffEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<UserTariffEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: UserTariffEntity): Promise<UserTariffEntity> {
    const newUser = this.repository.create(entity);

    await this.repository.save(newUser);

    return newUser;
  }

  async update(dto: UpdateUserTariffDto): Promise<UserTariffEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
