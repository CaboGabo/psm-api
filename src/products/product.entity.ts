import { CategoryEntity } from '../categories/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
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
}
