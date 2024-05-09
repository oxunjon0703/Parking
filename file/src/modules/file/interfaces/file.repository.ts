import { CreateFileDto } from '../dto/create-file.dto';
import { FileEntity } from '../entities/file.entity';

export interface IFileRepository {
  findAll(): Promise<Array<FileEntity>>;
  findOneById(id: number): Promise<FileEntity | undefined>;
  insert(dto: CreateFileDto): Promise<FileEntity>;
  delete(id: number): void;
}
