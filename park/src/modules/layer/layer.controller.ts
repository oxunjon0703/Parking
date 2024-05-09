import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { LayerService } from './layer.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';

@Controller()
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @GrpcMethod('LayerService', 'Create')
  create(@Payload() createLayerDto: CreateLayerDto) {
    return this.layerService.create(createLayerDto);
  }

  @GrpcMethod('LayerService', 'FindAll')
  findAll() {
    return this.layerService.findAll();
  }

  @GrpcMethod('LayerService', 'FindOne')
  findOne(data: { id: number }) {
    return this.layerService.findOneById(data.id);
  }

  @GrpcMethod('LayerService', 'Update')
  update(@Payload() updateLayerDto: UpdateLayerDto) {
    return this.layerService.updated(updateLayerDto);
  }

  @GrpcMethod('LayerService', 'Delete')
  remove(data: { id: number }) {
    return this.layerService.delete(data.id);
  }
}
