import { BaseEntity } from '../../../common/base.database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('parks')
export class ParkEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ name: 'owner', type: 'int' })
  owner: number;

  @Column({ name: 'image', type: 'int' })
  image: number;
}

// id, name, owner, image, created_at, last_edited_at
