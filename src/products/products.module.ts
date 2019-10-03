import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
