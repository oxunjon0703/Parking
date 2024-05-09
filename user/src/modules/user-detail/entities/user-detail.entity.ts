import { BaseEntity } from '../../../common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('user_details')
export class UserDetailEntity extends BaseEntity {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  firstname: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  lastname: string;

  @Column({
    name: 'avatar',
    type: 'int',
    nullable: true,
  })
  avatar: number;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  userId: number;
}

// id, firstname, lastname, avatar, user_id, created_at, last_edited_at;
