import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.database/base.entity';

@Entity('shots')
export class ShotEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'amount', type: 'int', default: 0 })
  amount: number;
}

// id, user_id, amount, created_at, last_edited_at
