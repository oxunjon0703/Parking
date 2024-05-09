import { ResData } from '../../../lib/resData';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';

export interface ITransactionService {
  findAll(): Promise<ResData<Array<TransactionEntity>>>;
  findOneById(id: number): Promise<ResData<TransactionEntity | undefined>>;
  create(dto: CreateTransactionDto): Promise<ResData<TransactionEntity>>;
  delete(id: number): Promise<ResData<TransactionEntity | undefined>>;
}
