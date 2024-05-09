import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { Repository } from 'typeorm';
import { IPlaceRepository } from './interfaces/place.repository';
import { UpdatePlaceDto } from './dto/update-place.dto';

export class PlaceRepository implements IPlaceRepository {
  constructor(
    @InjectRepository(PlaceEntity) private repository: Repository<PlaceEntity>,
  ) {}
  async findAll(): Promise<Array<PlaceEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<PlaceEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: PlaceEntity): Promise<PlaceEntity> {
    const newPlace = this.repository.create(entity);

    await this.repository.save(newPlace);

    return newPlace;
  }

  async update(dto: UpdatePlaceDto): Promise<PlaceEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
