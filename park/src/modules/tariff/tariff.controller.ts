import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Controller()
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @GrpcMethod('TariffService', 'Create')
  create(@Payload() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @GrpcMethod('TariffService', 'FindAll')
  findAll() {
    return this.tariffService.findAll();
  }

  @GrpcMethod('TariffService', 'FindOne')
  findOne(data: { id: number }) {
    return this.tariffService.findOneById(data.id);
  }

  @GrpcMethod('TariffService', 'Update')
  update(@Payload() updateTariffDto: UpdateTariffDto) {
    return this.tariffService.updated(updateTariffDto);
  }

  @GrpcMethod('TariffService', 'Delete')
  remove(data: { id: number }) {
    return this.tariffService.delete(data.id);
  }
}
