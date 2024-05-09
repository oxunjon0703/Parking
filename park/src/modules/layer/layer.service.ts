import { Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { ResData } from '../../lib/resData';
import { LayerEntity } from './entities/layer.entity';
import { LayerNotFoundRpcException } from './exception/layer.exception';
import { ILayerService } from './interfaces/layer.service';
import { LayerRepository } from './layer.repository';

@Injectable()
export class LayerService implements ILayerService {
  constructor(private readonly repository: LayerRepository) {}

  async findAll(): Promise<ResData<LayerEntity[]>> {
    const parks = await this.repository.findAll();

    return new ResData('get all parks', 200, parks);
  }

  async findOneById(id: number): Promise<ResData<LayerEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new LayerNotFoundRpcException();
    }

    return new ResData('get by id park', 200, foundData);
  }

  async create(dto: CreateLayerDto): Promise<ResData<LayerEntity>> {
    const newPark = new LayerEntity();

    Object.assign(newPark, dto);

    const newLayerEntity = await this.repository.insert(newPark);

    return new ResData('success', 200, newLayerEntity);
  }

  async updated(dto: UpdateLayerDto): Promise<ResData<LayerEntity>> {
    const { data: foundPark } = await this.findOneById(dto.id);

    if (!foundPark) {
      throw new LayerNotFoundRpcException();
    }

    const updateUser = await this.repository.update(dto);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: number): Promise<ResData<LayerEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new LayerNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
