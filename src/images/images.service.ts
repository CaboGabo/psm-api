import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { Repository } from 'typeorm';
import { ImageRO, ImageDTO } from './image.dto';
import { DetailEntity } from '../details/detail.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    @InjectRepository(DetailEntity)
    private detailRepository: Repository<DetailEntity>,
  ) {}

  private imageToResponseObject(image: ImageEntity): ImageRO {
    return {
      ...image,
      detail: image.detail || null,
    };
  }

  async showOne(id: string): Promise<ImageRO> {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    return this.imageToResponseObject(image);
  }

  async create(slugDetail: string, data: ImageDTO): Promise<ImageRO> {
    const detail = await this.detailRepository.findOne({
      where: { slugDetail },
      relations: ['product', 'images'],
    });

    if (!detail) {
      throw new HttpException('Detail not found', HttpStatus.NOT_FOUND);
    }

    const image = await this.imageRepository.create({
      ...data,
      detail,
    });

    await this.imageRepository.save(image);
    return this.imageToResponseObject(image);
  }

  async update(id: string, data: Partial<ImageDTO>): Promise<ImageRO> {
    let image = await this.imageRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    await this.imageRepository.update({ id }, data);
    image = await this.imageRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
    return this.imageToResponseObject(image);
  }

  async destroy(id: string): Promise<ImageRO> {
    const image = await this.imageRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!image) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    await this.imageRepository.remove(image);
    return this.imageToResponseObject(image);
  }
}
