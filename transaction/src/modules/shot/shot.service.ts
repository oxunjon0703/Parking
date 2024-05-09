import { Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { IShotService } from './interfaces/shot.service';
import { ResData } from '../../lib/resData';
import { ShotRepository } from './shot.repository';
import { ShotEntity } from './entities/shot.entity';
import { ShotNotFoundRpcException } from './exception/shot.exception';

@Injectable()
export class ShotService implements IShotService {
  constructor(private readonly repository: ShotRepository) {}

  async findAll(): Promise<ResData<ShotEntity[]>> {
    const Shots = await this.repository.findAll();

    return new ResData('get all shots', 200, Shots);
  }

  async findOneById(id: number): Promise<ResData<ShotEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ShotNotFoundRpcException();
    }

    return new ResData('get by id shot', 200, foundData);
  }

  async create(dto: CreateShotDto): Promise<ResData<ShotEntity>> {
    const newShot = new ShotEntity();

    Object.assign(newShot, dto);

    const newShotEntity = await this.repository.insert(newShot);

    return new ResData('success', 200, newShotEntity);
  }

  async updated(dto: UpdateShotDto): Promise<ResData<ShotEntity>> {
    const { data: foundShot } = await this.findOneById(dto.id);

    if (!foundShot) {
      throw new ShotNotFoundRpcException();
    }

    const updateUser = await this.repository.update(dto);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: number): Promise<ResData<ShotEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ShotNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
