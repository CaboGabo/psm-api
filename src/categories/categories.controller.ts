import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../shared/validation.pipe';
import { CategoryDTO } from './category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  showAllCategories() {
    return this.categoriesService.showAll();
  }

  @Get(':slug')
  showOneCategory(@Param('slug') slug) {
    return this.categoriesService.showOne(slug);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createCategory(@Body() body: CategoryDTO) {
    return this.categoriesService.create(body);
  }

  @Put(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateCategory(
    @Param('slug') slug: string,
    @Body() body: Partial<CategoryDTO>,
  ) {
    return this.categoriesService.update(slug, body);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteCategory(@Param('slug') slug: string) {
    return this.categoriesService.destroy(slug);
  }
}
