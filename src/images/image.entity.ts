import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { DetailEntity } from '../details/detail.entity';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  url: string;

  @ManyToOne(type => DetailEntity, detail => detail.images)
  detail: DetailEntity;
}
