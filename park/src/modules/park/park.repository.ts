import { InjectRepository } from '@nestjs/typeorm';
import { ParkEntity } from './entities/park.entity';
import { Repository } from 'typeorm';
import { IParkRepository } from './interfaces/Park.repository';
import { UpdateParkDto } from './dto/update-Park.dto';

export class ParkRepository implements IParkRepository {
  constructor(
    @InjectRepository(ParkEntity) private repository: Repository<ParkEntity>,
  ) {}
  async findAll(): Promise<Array<ParkEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<ParkEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<ParkEntity | undefined> {
    return await this.repository.findOneBy({ name });
  }

  async insert(entity: ParkEntity): Promise<ParkEntity> {
    const newPark = this.repository.create(entity);

    await this.repository.save(newPark);

    return newPark;
  }

  async update(dto: UpdateParkDto): Promise<ParkEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
