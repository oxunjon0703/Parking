import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interfaces/place.service';
import { ResData } from '../../lib/resData';
import { PlaceEntity } from './entities/place.entity';
import { PlaceNotFoundRpcException } from './exception/place.exception';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService implements IPlaceService {
  constructor(private readonly repository: PlaceRepository) {}

  async findAll(): Promise<ResData<PlaceEntity[]>> {
    const places = await this.repository.findAll();

    return new ResData('get all places', 200, places);
  }

  async findOneById(id: number): Promise<ResData<PlaceEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new PlaceNotFoundRpcException();
    }

    return new ResData('get by id place', 200, foundData);
  }

  async create(dto: CreatePlaceDto): Promise<ResData<PlaceEntity>> {
    const newPlace = new PlaceEntity();

    Object.assign(newPlace, dto);

    const newPlaceEntity = await this.repository.insert(newPlace);

    return new ResData('success', 200, newPlaceEntity);
  }

  async updated(dto: UpdatePlaceDto): Promise<ResData<PlaceEntity>> {
    const { data: foundPlace } = await this.findOneById(dto.id);

    if (!foundPlace) {
      throw new PlaceNotFoundRpcException();
    }

    const updatePlace = await this.repository.update(dto);

    return new ResData('updated', 201, updatePlace);
  }

  async delete(id: number): Promise<ResData<PlaceEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new PlaceNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
