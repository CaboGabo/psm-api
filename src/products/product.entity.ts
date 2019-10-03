import { CategoryEntity } from '../categories/category.entity';
import { DetailEntity } from '../details/detail.entity';
import { DetailRO } from '../details/detail.dto';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  name: string;

  @Column()
  header: string;

  @Column()
  metatitle: string;

  @Column('text')
  metadescription: string;

  @Column('text')
  description: string;

  @Column()
  slug: string;

  @ManyToOne(type => CategoryEntity, category => category.products)
  category: CategoryEntity;

  @OneToMany(type => DetailEntity, detail => detail.product)
  details: DetailRO[];
}
