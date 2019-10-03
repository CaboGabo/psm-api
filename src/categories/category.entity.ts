import { ProductEntity } from '../products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
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

  @Column()
  slug: string;

  @OneToMany(type => ProductEntity, product => product.category)
  products: ProductEntity[];
}
