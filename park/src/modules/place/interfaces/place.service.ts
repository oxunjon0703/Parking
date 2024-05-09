import { ResData } from '../../../lib/resData';
import { PlaceEntity } from '../entities/place.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';

export interface IPlaceService {
  findAll(): Promise<ResData<Array<PlaceEntity>>>;
  findOneById(id: number): Promise<ResData<PlaceEntity | undefined>>;
  create(dto: CreatePlaceDto): Promise<ResData<PlaceEntity>>;
  updated(dto: UpdatePlaceDto): Promise<ResData<PlaceEntity>>;
  delete(id: number): Promise<ResData<PlaceEntity | undefined>>;
}
