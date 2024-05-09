import { BaseEntity } from '../../../common/base.database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @Column({ name: 'park_id', type: 'int', nullable: false })
  parkId: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'started_at', type: 'date', nullable: false })
  startedAt: Date;

  @Column({ name: 'ended_at', type: 'date', nullable: false })
  endedAt: Date;

  @Column({ name: 'price', type: 'int', default: 0, nullable: false })
  price: number;

  @Column({ name: 'tariff_id', type: 'int', nullable: true })
  tariffId: number;
}

// id, park_id, user_id, started_at, ended_at, price, tariff_id, created_at, last_edited_at
