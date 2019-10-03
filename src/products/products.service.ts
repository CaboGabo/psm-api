import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductRO, ProductDTO } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private productToResponseObject(product: ProductEntity): ProductRO {
    const responseObject: any = {
      ...product,
      category: product.category || null,
    };

    return responseObject;
  }

  async showOne(slug: string): Promise<ProductRO> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productToResponseObject(product);
  }

  async create(data: ProductDTO): Promise<ProductRO> {
    const product = await this.productRepository.create({
      ...data,
    });

    await this.productRepository.save(product);
    return this.productToResponseObject(product);
  }

  async update(slug: string, data: Partial<ProductDTO>): Promise<ProductRO> {
    let product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update({ id: product.id }, data);
    product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category'],
    });

    return this.productToResponseObject(product);
  }

  async destroy(slug: string): Promise<ProductRO> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.remove(product);
    return this.productToResponseObject(product);
  }
}
