import { ResData } from '../../../lib/resData';
import { ParkEntity } from '../entities/park.entity';
import { CreateParkDto } from '../dto/create-park.dto';
import { UpdateParkDto } from '../dto/update-park.dto';

export interface IParkService {
  findAll(): Promise<ResData<Array<ParkEntity>>>;
  findOneById(id: number): Promise<ResData<ParkEntity | undefined>>;
  create(dto: CreateParkDto): Promise<ResData<ParkEntity>>;
  updated(dto: UpdateParkDto): Promise<ResData<ParkEntity>>;
  delete(id: number): Promise<ResData<ParkEntity | undefined>>;
}
