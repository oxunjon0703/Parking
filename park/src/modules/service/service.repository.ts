import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Repository } from 'typeorm';
import { IServiceRepository } from './interfaces/service.repository';
import { UpdateServiceDto } from './dto/update-service.dto';

export class ServiceRepository implements IServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private repository: Repository<ServiceEntity>,
  ) {}
  async findAll(): Promise<Array<ServiceEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<ServiceEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: ServiceEntity): Promise<ServiceEntity> {
    const newService = this.repository.create(entity);

    await this.repository.save(newService);

    return newService;
  }

  async update(dto: UpdateServiceDto): Promise<ServiceEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
