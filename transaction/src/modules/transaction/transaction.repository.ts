import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransactionRepository } from './interfaces/transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}
  async findAll(): Promise<Array<TransactionEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<TransactionEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: TransactionEntity): Promise<TransactionEntity> {
    const newTransaction = this.repository.create(entity);

    await this.repository.save(newTransaction);

    return newTransaction;
  }

  async update(dto: UpdateTransactionDto): Promise<TransactionEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
