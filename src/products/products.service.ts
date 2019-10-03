import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductRO, ProductDTO } from './product.dto';
import { CategoryEntity } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  private productToResponseObject(product: ProductEntity): ProductRO {
    const responseObject: any = {
      ...product,
      category: product.category || null,
      details: product.details || null,
    };

    return responseObject;
  }

  async showOne(slug: string): Promise<ProductRO> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'details'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productToResponseObject(product);
  }

  async create(categorySlug: string, data: ProductDTO): Promise<ProductRO> {
    console.log(categorySlug);
    const category = await this.categoryRepository.findOne({
      where: { slug: categorySlug },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.productRepository.create({
      ...data,
      category,
    });

    await this.productRepository.save(product);
    return this.productToResponseObject(product);
  }

  async update(slug: string, data: Partial<ProductDTO>): Promise<ProductRO> {
    let product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'details'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update({ id: product.id }, data);
    product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'details'],
    });

    return this.productToResponseObject(product);
  }

  async destroy(slug: string): Promise<ProductRO> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'details'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.remove(product);
    return this.productToResponseObject(product);
  }
}
