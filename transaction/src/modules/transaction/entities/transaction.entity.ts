import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.database/base.entity';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ name: 'shot_credit_id', type: 'int', nullable: false })
  shotCreditId: number;

  @Column({ name: 'shot_debit_id', type: 'int', nullable: false })
  shotDebitId: number;

  @Column({ name: 'service_id', type: 'int', nullable: false })
  serviceId: number;

  @Column({ name: 'amount', type: 'int', nullable: false })
  amount: number;
}

// id, shot_credit_id, shot_debit_id, service_id, amount, created_at, last_edited_at
