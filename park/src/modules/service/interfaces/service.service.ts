import { ResData } from '../../../lib/resData';
import { ServiceEntity } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';

export interface IServiceService {
  findAll(): Promise<ResData<Array<ServiceEntity>>>;
  findOneById(id: number): Promise<ResData<ServiceEntity | undefined>>;
  create(dto: CreateServiceDto): Promise<ResData<ServiceEntity>>;
  updated(dto: UpdateServiceDto): Promise<ResData<ServiceEntity>>;
  delete(id: number): Promise<ResData<ServiceEntity | undefined>>;
}
