import { Inject, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { PARK_PACKAGE } from '../../common/consts/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { Cache } from '@nestjs/cache-manager';
import { ResData } from '../../lib/resData';

@Injectable()
export class ParkService {
  private parkService: any;

  constructor(
    @Inject(PARK_PACKAGE) private ParkClient: ClientGrpc,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.parkService = this.ParkClient.getService('ParkService');
  }

  async create(createParkDto: CreateParkDto) {
    const name: string = createParkDto.name;

    const checkPhone: Observable<any> = await this.parkService.FindOneName({
      name,
    });

    await lastValueFrom(checkPhone);

    const createData = await this.parkService.Create(createParkDto);

    await this.cacheManager.del('parks');

    return createData;
  }

  async findAll() {
    const allParks = await this.cacheManager.get('parks');

    if (allParks) {
      return new ResData('get all parks redis', 200, allParks);
    }

    const data: Observable<any> = await this.parkService.FindAll({});

    const allData = await lastValueFrom(data);

    await this.cacheManager.set('parks', allData, 0);

    return new ResData('get all parks', 200, allData);
  }

  async findOne(id: number) {
    return await this.parkService.FindOne({ id });
  }

  async findOneName(name: string) {
    return await this.parkService.FindOneName({ name });
  }

  async update(id: number, updateParkDto: UpdateParkDto) {
    const name: string = updateParkDto.name;

    const checkPhone: Observable<any> = await this.parkService.FindOneName({
      name,
    });

    const dto = { id: id, ...updateParkDto };

    await lastValueFrom(checkPhone);

    const updateData = await this.parkService.Update(dto);

    await this.cacheManager.del('parks');

    return updateData;
  }

  async remove(id: number) {
    const deleteData = await this.parkService.Delete({ id });

    await this.cacheManager.del('parks');

    return deleteData;
  }
}
