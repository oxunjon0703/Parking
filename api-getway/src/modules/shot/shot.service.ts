import { Inject, Injectable } from '@nestjs/common';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { TRANSACTION_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ShotService {
  private shotService: any;

  constructor(@Inject(TRANSACTION_PACKAGE) private ShotClient: ClientGrpc) {}

  onModuleInit() {
    this.shotService = this.ShotClient.getService('ShotService');
  }

  async create(createShotDto: CreateShotDto) {
    return await this.shotService.Create(createShotDto);
  }

  async findAll() {
    return await this.shotService.FindAll({});
  }

  async findOne(id: number) {
    return await this.shotService.FindOne({ id });
  }

  async update(id: number, updateShotDto: UpdateShotDto) {
    const dto = { id: id, ...updateShotDto };

    return await this.shotService.Update(dto);
  }

  async remove(id: number) {
    return await this.shotService.Delete({ id });
  }
}
