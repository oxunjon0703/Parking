import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { ShotService } from './shot.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';

@Controller()
export class ShotController {
  constructor(private readonly shotService: ShotService) {}

  @GrpcMethod('ShotService', 'Create')
  create(@Payload() createShotDto: CreateShotDto) {
    return this.shotService.create(createShotDto);
  }

  @GrpcMethod('ShotService', 'FindAll')
  findAll() {
    return this.shotService.findAll();
  }

  @GrpcMethod('ShotService', 'FindOne')
  findOne(data: { id: number }) {
    return this.shotService.findOneById(data.id);
  }

  @GrpcMethod('ShotService', 'Update')
  update(@Payload() updateShotDto: UpdateShotDto) {
    return this.shotService.updated(updateShotDto);
  }

  @GrpcMethod('ShotService', 'Delete')
  remove(data: { id: number }) {
    return this.shotService.delete(data.id);
  }
}
