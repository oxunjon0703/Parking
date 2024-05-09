import { Inject, Injectable } from '@nestjs/common';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TariffService {
  private tariffService: any;

  constructor(@Inject(PARK_PACKAGE) private TariffClient: ClientGrpc) {}

  onModuleInit() {
    this.tariffService = this.TariffClient.getService('TariffService');
  }
  async create(createTariffDto: CreateTariffDto) {
    return await this.tariffService.Create(createTariffDto);
  }

  async findAll() {
    return this.tariffService.findAll({});
  }

  async findOne(id: number) {
    return this.tariffService.findOne({ id });
  }

  async update(id: number, updateTariffDto: UpdateTariffDto) {
    const dto = { id: id, ...updateTariffDto };
    return await this.tariffService.Update(dto);
  }

  async remove(id: number) {
    return await this.tariffService.Delete({ id });
  }
}
