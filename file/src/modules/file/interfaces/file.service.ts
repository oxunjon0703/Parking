import { ResData } from '../../../lib/resData';
import { FileEntity } from '../entities/file.entity';
import { CreateFileDto } from '../dto/create-file.dto';

export interface IFileService {
  findAll(): Promise<ResData<Array<FileEntity>>>;
  findOneById(id: number): Promise<ResData<FileEntity | undefined>>;
  create(dto: CreateFileDto): Promise<ResData<FileEntity>>;
  delete(id: number): Promise<ResData<FileEntity | undefined>>;
}
