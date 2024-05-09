import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { PlaceEntity } from '../entities/place.entity';

export interface IPlaceRepository {
  findAll(): Promise<Array<PlaceEntity>>;
  findOneById(id: number): Promise<PlaceEntity | undefined>;
  insert(dto: CreatePlaceDto): Promise<PlaceEntity>;
  update(dto: UpdatePlaceDto): Promise<PlaceEntity>;
  delete(id: number): void;
}
