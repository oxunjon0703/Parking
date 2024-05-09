import { Inject, Injectable } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class LayerService {
  private layerService: any;

  constructor(@Inject(PARK_PACKAGE) private LayerClient: ClientGrpc) {}

  onModuleInit() {
    this.layerService = this.LayerClient.getService('LayerService');
  }
  async create(createLayerDto: CreateLayerDto) {
    return await this.layerService.Create(createLayerDto);
  }

  async findAll() {
    return await this.layerService.FindAll({});
  }

  async findOne(id: number) {
    return await this.layerService.FindOne({ id });
  }

  async update(id: number, updateLayerDto: UpdateLayerDto) {
    const dto = { id: id, ...updateLayerDto };
    return await this.layerService.Update(dto);
  }

  async remove(id: number) {
    return await this.layerService.Delete({ id });
  }
}
