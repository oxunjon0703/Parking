import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';

export interface ITransactionRepository {
  findAll(): Promise<Array<TransactionEntity>>;
  findOneById(id: number): Promise<TransactionEntity | undefined>;
  insert(dto: CreateTransactionDto): Promise<TransactionEntity>;
  delete(id: number): void;
}
