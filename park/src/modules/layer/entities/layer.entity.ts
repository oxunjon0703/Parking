import { BaseEntity } from '../../../common/base.database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('layers')
export class LayerEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'floor', type: 'int', nullable: true })
  floor: number;

  @Column({ name: 'park_id', type: 'int', nullable: false })
  parkId: number;
}

// id, name, floor, park_id, created_at, last_edited_at
