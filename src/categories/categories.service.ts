import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryRO, CategoryDTO } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  private categoryToResponseObject(category: CategoryEntity): CategoryRO {
    const responseObject: any = {
      ...category,
      products: category.products || null,
    };

    return responseObject;
  }

  async showAll(): Promise<CategoryRO[]> {
    const categories = await this.categoryRepository.find({
      relations: ['products'],
    });
    return categories.map(category => this.categoryToResponseObject(category));
  }

  async showOne(slug: string): Promise<CategoryRO> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.categoryToResponseObject(category);
  }

  async create(data: CategoryDTO): Promise<CategoryRO> {
    const category = await this.categoryRepository.create({
      ...data,
    });

    await this.categoryRepository.save(category);
    return this.categoryToResponseObject(category);
  }

  async update(slug: string, data: Partial<CategoryDTO>): Promise<CategoryRO> {
    let category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await this.categoryRepository.update({ id: category.id }, data);
    category = await this.categoryRepository.findOne({
      where: { slug },
    });

    return this.categoryToResponseObject(category);
  }

  async destroy(slug: string): Promise<CategoryRO> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await this.categoryRepository.remove(category);
    return this.categoryToResponseObject(category);
  }
}
