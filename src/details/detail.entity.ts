import { ProductEntity } from '../products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('details')
export class DetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column('text')
  description: string;

  @Column({
    type: 'float',
    default: 0,
  })
  price: number;

  @Column()
  slug: string;

  @ManyToOne(type => ProductEntity, product => product.details)
  product: ProductEntity;
}
