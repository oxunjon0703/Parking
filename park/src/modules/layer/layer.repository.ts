import { InjectRepository } from '@nestjs/typeorm';
import { LayerEntity } from './entities/layer.entity';
import { Repository } from 'typeorm';
import { ILayerRepository } from './interfaces/layer.repository';
import { UpdateLayerDto } from './dto/update-layer.dto';

export class LayerRepository implements ILayerRepository {
  constructor(
    @InjectRepository(LayerEntity) private repository: Repository<LayerEntity>,
  ) {}
  async findAll(): Promise<Array<LayerEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<LayerEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: LayerEntity): Promise<LayerEntity> {
    const newLayer = this.repository.create(entity);

    await this.repository.save(newLayer);

    return newLayer;
  }

  async update(dto: UpdateLayerDto): Promise<LayerEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
