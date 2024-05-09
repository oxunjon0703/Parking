import { CreateShotDto } from '../dto/create-shot.dto';
import { UpdateShotDto } from '../dto/update-shot.dto';
import { ShotEntity } from '../entities/shot.entity';

export interface IShotRepository {
  findAll(): Promise<Array<ShotEntity>>;
  findOneById(id: number): Promise<ShotEntity | undefined>;
  insert(dto: CreateShotDto): Promise<ShotEntity>;
  update(dto: UpdateShotDto): Promise<ShotEntity>;
  delete(id: number): void;
}
