import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @GrpcMethod('ServiceService', 'Create')
  create(@Payload() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @GrpcMethod('ServiceService', 'FindAll')
  findAll() {
    return this.serviceService.findAll();
  }

  @GrpcMethod('ServiceService', 'FindOne')
  findOne(data: { id: number }) {
    return this.serviceService.findOneById(data.id);
  }

  @GrpcMethod('ServiceService', 'Update')
  update(@Payload() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updated(updateServiceDto);
  }

  @GrpcMethod('ServiceService', 'Delete')
  remove(data: { id: number }) {
    return this.serviceService.delete(data.id);
  }
}
