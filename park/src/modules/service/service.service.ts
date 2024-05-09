import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IServiceService } from './interfaces/service.service';
import { ServiceRepository } from './service.repository';
import { ResData } from 'src/lib/resData';
import { ServiceEntity } from './entities/service.entity';
import { ServiceNotFoundRpcException } from './exception/service.exception';

@Injectable()
export class ServiceService implements IServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  async findAll(): Promise<ResData<ServiceEntity[]>> {
    const Services = await this.repository.findAll();

    return new ResData('get all Services', 200, Services);
  }

  async findOneById(id: number): Promise<ResData<ServiceEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ServiceNotFoundRpcException();
    }

    return new ResData('get by id Service', 200, foundData);
  }

  async create(dto: CreateServiceDto): Promise<ResData<ServiceEntity>> {
    const newService = new ServiceEntity();

    Object.assign(newService, dto);

    const newServiceEntity = await this.repository.insert(newService);

    return new ResData('success', 200, newServiceEntity);
  }

  async updated(dto: UpdateServiceDto): Promise<ResData<ServiceEntity>> {
    const { data: foundService } = await this.findOneById(dto.id);

    if (!foundService) {
      throw new ServiceNotFoundRpcException();
    }

    const updateService = await this.repository.update(dto);

    return new ResData('updated', 201, updateService);
  }

  async delete(id: number): Promise<ResData<ServiceEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new ServiceNotFoundRpcException();
    }

    await this.repository.delete(id);

    return new ResData('delete', 200, foundData);
  }
}
