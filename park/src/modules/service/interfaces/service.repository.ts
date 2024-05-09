import { UpdateServiceDto } from '../dto/update-service.dto';
import { ServiceEntity } from '../entities/service.entity';

export interface IServiceRepository {
  findAll(): Promise<Array<ServiceEntity>>;
  findOneById(id: number): Promise<ServiceEntity | undefined>;
  insert(dto: ServiceEntity): Promise<ServiceEntity>;
  update(dto: UpdateServiceDto): Promise<ServiceEntity>;
  delete(id: number): void;
}
