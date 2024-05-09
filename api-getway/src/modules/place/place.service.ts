import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PlaceService {
  private placeService: any;

  constructor(@Inject(PARK_PACKAGE) private PlaceClient: ClientGrpc) {}

  onModuleInit() {
    this.placeService = this.PlaceClient.getService('PlaceService');
  }
  async create(createPlaceDto: CreatePlaceDto) {
    return await this.placeService.Create(createPlaceDto);
  }

  async findAll() {
    return await this.placeService.FindAll({});
  }

  async findOne(id: number) {
    return await this.placeService.FindOne({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const data = { id: id, ...updatePlaceDto };
    return await this.placeService.Update(data);
  }

  async remove(id: number) {
    return await this.placeService.Delete({ id });
  }
}
