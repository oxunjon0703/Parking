import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';

@Controller()
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @GrpcMethod('ParkService', 'Create')
  create(@Payload() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @GrpcMethod('ParkService', 'FindAll')
  findAll() {
    return this.parkService.findAll();
  }

  @GrpcMethod('ParkService', 'FindOne')
  findOne(data: { id: number }) {
    return this.parkService.findOneById(data.id);
  }

  @GrpcMethod('ParkService', 'FindOneName')
  findOneName(data: { name: string }) {
    return this.parkService.findOneByName(data.name);
  }

  @GrpcMethod('ParkService', 'Update')
  update(@Payload() updateParkDto: UpdateParkDto) {
    return this.parkService.updated(updateParkDto);
  }

  @GrpcMethod('ParkService', 'Delete')
  remove(data: { id: number }) {
    return this.parkService.delete(data.id);
  }
}
