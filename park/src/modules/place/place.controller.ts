import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @GrpcMethod('PlaceService', 'Create')
  create(@Payload() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @GrpcMethod('PlaceService', 'FindAll')
  findAll() {
    return this.placeService.findAll();
  }

  @GrpcMethod('PlaceService', 'FindOne')
  findOne(data: { id: number }) {
    return this.placeService.findOneById(data.id);
  }

  @GrpcMethod('PlaceService', 'Update')
  update(@Payload() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.updated(updatePlaceDto);
  }

  @GrpcMethod('PlaceService', 'Delete')
  remove(data: { id: number }) {
    return this.placeService.delete(data.id);
  }
}
