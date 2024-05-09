import { ResData } from '../../../lib/resData';
import { CreateShotDto } from '../dto/create-shot.dto';
import { UpdateShotDto } from '../dto/update-shot.dto';
import { ShotEntity } from '../entities/shot.entity';

export interface IShotService {
  findAll(): Promise<ResData<Array<ShotEntity>>>;
  findOneById(id: number): Promise<ResData<ShotEntity | undefined>>;
  create(dto: CreateShotDto): Promise<ResData<ShotEntity>>;
  updated(dto: UpdateShotDto): Promise<ResData<ShotEntity>>;
  delete(id: number): Promise<ResData<ShotEntity | undefined>>;
}
