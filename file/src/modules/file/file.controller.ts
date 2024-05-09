import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @GrpcMethod('FileService', 'Create')
  create(@Payload() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @GrpcMethod('FileService', 'FindAll')
  findAll() {
    return this.fileService.findAll();
  }

  @GrpcMethod('FileService', 'FindOne')
  findOne(data: { id: number }) {
    return this.fileService.findOneById(data.id);
  }

  @GrpcMethod('FileService', 'Delete')
  remove(data: { id: number }) {
    return this.fileService.delete(data.id);
  }
}
