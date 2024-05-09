import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ServiceService {
  private serviceService: any;

  constructor(@Inject(PARK_PACKAGE) private serviceClient: ClientGrpc) {}

  onModuleInit() {
    this.serviceService = this.serviceClient.getService('ServiceService');
  }

  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceService.Create(createServiceDto);
  }

  async findAll() {
    return await this.serviceService.FindAll({});
  }

  async findOne(id: number) {
    return await this.serviceService.FindOne({ id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const dto = { id: id, ...updateServiceDto };

    return await this.serviceService.Update(dto);
  }

  async remove(id: number) {
    return await this.serviceService.Delete({ id });
  }
}
