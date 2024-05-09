import { ResData } from '../../../lib/resData';
import { LayerEntity } from '../entities/layer.entity';
import { CreateLayerDto } from '../dto/create-layer.dto';
import { UpdateLayerDto } from '../dto/update-layer.dto';

export interface ILayerService {
  findAll(): Promise<ResData<Array<LayerEntity>>>;
  findOneById(id: number): Promise<ResData<LayerEntity | undefined>>;
  create(dto: CreateLayerDto): Promise<ResData<LayerEntity>>;
  updated(dto: UpdateLayerDto): Promise<ResData<LayerEntity>>;
  delete(id: number): Promise<ResData<LayerEntity | undefined>>;
}
