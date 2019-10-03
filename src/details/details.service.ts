import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailEntity } from './detail.entity';
import { Repository } from 'typeorm';
import { DetailRO, DetailDTO } from './detail.dto';
import { ProductEntity } from '../products/product.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(DetailEntity)
    private detailRepository: Repository<DetailEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private detailToResponseObject(detail: DetailEntity): DetailRO {
    const responseObject: any = {
      ...detail,
      product: detail.product || null,
      images: detail.images || null,
    };

    return responseObject;
  }

  async showOne(slug: string): Promise<DetailRO> {
    const detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product', 'images'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    return this.detailToResponseObject(detail);
  }

  async create(slugProduct: string, data: DetailDTO): Promise<DetailRO> {
    const product = await this.productRepository.findOne({
      where: { slug: slugProduct },
      relations: ['details', 'category'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const detail = await this.detailRepository.create({
      ...data,
      product,
    });

    await this.detailRepository.save(detail);
    return this.detailToResponseObject(detail);
  }

  async update(slug: string, data: Partial<DetailDTO>): Promise<DetailRO> {
    let detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product', 'images'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    await this.detailRepository.update({ id: detail.id }, data);
    detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product', 'images'],
    });

    return this.detailToResponseObject(detail);
  }

  async destroy(slug: string): Promise<DetailRO> {
    const detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product', 'images'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    await this.detailRepository.remove(detail);
    return this.detailToResponseObject(detail);
  }
}
