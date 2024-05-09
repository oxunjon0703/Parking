import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/baseEntity';
import { RoleEnum } from '../../../common/types/enums';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 126,
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  role: RoleEnum;

  @Column({
    name: 'park_id',
    type: 'int',
  })
  parkId: number;
}

// id, phone, password, role, created_at, last_edited_at, park_id
