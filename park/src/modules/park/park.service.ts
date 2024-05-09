import { Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { IParkService } from './interfaces/park.service';
import { ResData } from '../../lib/resData';
import { ParkEntity } from './entities/park.entity';
import { ParkRepository } from './park.repository';
import {
  ParkNameAlreadyRpcException,
  ParkNotFoundRpcException,
} from './exception/park.exception';

@Injectable()
export class ParkService implements IParkService {
  constructor(private readonly repository: ParkRepository) {}

  async findAll(): Promise<ResData<ParkEntity[]>> {
    const parks = await this.repository.findAll();

    return new ResData('get all parks', 200, parks);
  }

  async findOneById(id: number): Promise<ResData<ParkEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ParkNotFoundRpcException();
    }

    return new ResData('get by id park', 200, foundData);
  }

  async findOneByName(name: string): Promise<ResData<ParkEntity>> {
    const foundData = await this.repository.findOneByName(name);

    if (foundData) {
      throw new ParkNameAlreadyRpcException();
    }

    return new ResData('get by name park', 200, foundData);
  }

  async create(dto: CreateParkDto): Promise<ResData<ParkEntity>> {
    const newPark = new ParkEntity();

    Object.assign(newPark, dto);

    const newParkEntity = await this.repository.insert(newPark);

    return new ResData('success', 200, newParkEntity);
  }

  async updated(dto: UpdateParkDto): Promise<ResData<ParkEntity>> {
    const { data: foundPark } = await this.findOneById(dto.id);

    if (!foundPark) {
      throw new ParkNotFoundRpcException();
    }

    const updateUser = await this.repository.update(dto);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: number): Promise<ResData<ParkEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ParkNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
