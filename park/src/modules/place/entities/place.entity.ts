import { BaseEntity } from '../../../common/base.database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('places')
export class PlaceEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'layer_id', type: 'int', nullable: false })
  layerId: number;

  @Column({ name: 'price', type: 'int', default: 0, nullable: true })
  price: number;
}

// id, name, layer_id, price, created_at, last_edited_at
