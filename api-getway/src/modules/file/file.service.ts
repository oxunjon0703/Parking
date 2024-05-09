import { Inject, Injectable } from '@nestjs/common';
import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { CreateFileDto } from './dto/create-File.dto';
import { unlink } from 'node:fs';
import { FILE_PACKAGE } from 'src/common/consts/microservices';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class FileService {
  private fileService: any;

  constructor(@Inject(FILE_PACKAGE) private LayerClient: ClientGrpc) {}

  onModuleInit() {
    this.fileService = this.LayerClient.getService('FileService');
  }

  async findAll() {
    const files: Observable<any> = await this.fileService.FindAll({});

    const data = await firstValueFrom(files);

    return new ResData('get all files', 200, data);
  }

  async findOne(id: ID) {
    return await this.fileService.FindOne({ id });
  }

  async create(dto: CreateFileDto) {
    const newData: Observable<any> = await this.fileService.Create(dto);

    const data = await firstValueFrom(newData);

    return new ResData('created', 201, data);
  }

  async delete(id: ID) {
    const found: Observable<any> = await this.fileService.FindOne({ id });

    const foundFile = await firstValueFrom(found);

    if (foundFile.data.url) {
      unlink(`${foundFile.data.url}`, (err) => {
        if (err) throw err;
      });
    }

    await this.fileService.Delete({ id });

    return new ResData('deleted', 204, foundFile.data);
  }
}
