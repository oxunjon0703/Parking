import { BaseEntity } from '../../../common/base.database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tariffs')
export class TariffEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'park_id', type: 'int', nullable: false })
  parkId: number;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @Column({ name: 'time', type: 'int', nullable: false })
  time: number;
}

// id, name, park_id, price, time, created_at, last_edited_at
