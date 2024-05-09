import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/baseEntity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: false })
  size: number;
}

// id, url, mimetype, size, created_at, last_edited_at
