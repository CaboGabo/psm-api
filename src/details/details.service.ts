import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailEntity } from './detail.entity';
import { Repository } from 'typeorm';
import { DetailRO, DetailDTO } from './detail.dto';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(DetailEntity)
    private detailRepository: Repository<DetailEntity>,
  ) {}

  private detailToResponseObject(detail: DetailEntity): DetailRO {
    const responseObject: any = {
      ...detail,
      product: detail.product || null,
    };

    return responseObject;
  }

  async showOne(slug: string): Promise<DetailRO> {
    const detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    return this.detailToResponseObject(detail);
  }

  async create(data: DetailDTO): Promise<DetailRO> {
    const detail = await this.detailRepository.create({
      ...data,
    });

    await this.detailRepository.save(detail);
    return this.detailToResponseObject(detail);
  }

  async update(slug: string, data: Partial<DetailDTO>): Promise<DetailRO> {
    let detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    await this.detailRepository.update({ id: detail.id }, data);
    detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product'],
    });

    return this.detailToResponseObject(detail);
  }

  async destroy(slug: string): Promise<DetailRO> {
    const detail = await this.detailRepository.findOne({
      where: { slug },
      relations: ['product'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    await this.detailRepository.remove(detail);
    return this.detailToResponseObject(detail);
  }
}
