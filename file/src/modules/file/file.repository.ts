import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFileRepository } from './interfaces/file.repository';
import { FileEntity } from './entities/file.entity';

export class FileRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileEntity) private repository: Repository<FileEntity>,
  ) {}
  async findAll(): Promise<Array<FileEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<FileEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: FileEntity): Promise<FileEntity> {
    const newFile = this.repository.create(entity);

    await this.repository.save(newFile);

    return newFile;
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
