import { CreateParkDto } from '../dto/create-park.dto';
import { UpdateParkDto } from '../dto/update-park.dto';
import { ParkEntity } from '../entities/park.entity';

export interface IParkRepository {
  findAll(): Promise<Array<ParkEntity>>;
  findOneById(id: number): Promise<ParkEntity | undefined>;
  insert(dto: CreateParkDto): Promise<ParkEntity>;
  update(dto: UpdateParkDto): Promise<ParkEntity>;
  delete(id: number): void;
}
