import { CreateLayerDto } from '../dto/create-layer.dto';
import { UpdateLayerDto } from '../dto/update-layer.dto';
import { LayerEntity } from '../entities/layer.entity';

export interface ILayerRepository {
  findAll(): Promise<Array<LayerEntity>>;
  findOneById(id: number): Promise<LayerEntity | undefined>;
  insert(dto: CreateLayerDto): Promise<LayerEntity>;
  update(dto: UpdateLayerDto): Promise<LayerEntity>;
  delete(id: number): void;
}
