import { BaseEntity } from '../../../common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('user_tariffs')
export class UserTariffEntity extends BaseEntity {
  @Column({
    name: 'user_id',
    type: 'int',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'tariff_id',
    type: 'int',
    nullable: false,
  })
  tariffId: number;

  @Column({
    name: 'started_at',
    type: 'date',
    nullable: false,
  })
  startedAt: Date;

  @Column({
    name: 'ended_at',
    type: 'date',
    nullable: false,
  })
  endedAt: Date;
}

// id, user_id, tariff_id, started_at, ended_at, created_at, last_edited_at
