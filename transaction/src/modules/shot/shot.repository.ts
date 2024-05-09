import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShotRepository } from './interfaces/shot.repository';
import { ShotEntity } from './entities/shot.entity';
import { UpdateShotDto } from './dto/update-shot.dto';

export class ShotRepository implements IShotRepository {
  constructor(
    @InjectRepository(ShotEntity) private repository: Repository<ShotEntity>,
  ) {}
  async findAll(): Promise<Array<ShotEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<ShotEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: ShotEntity): Promise<ShotEntity> {
    const newShot = this.repository.create(entity);

    await this.repository.save(newShot);

    return newShot;
  }

  async update(dto: UpdateShotDto): Promise<ShotEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
