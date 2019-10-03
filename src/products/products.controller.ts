import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { ProductDTO } from './product.dto';

@Controller()
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('api/products/:slug')
  showOneProduct(@Param('slug') slug) {
    return this.productService.showOne(slug);
  }

  @Post('api/categories/:categorySlug/products')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createProduct(
    @Param('categorySlug') categorySlug: string,
    @Body() body: ProductDTO,
  ) {
    return this.productService.create(categorySlug, body);
  }

  @Put('api/products/:slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param('slug') slug: string,
    @Body() body: Partial<ProductDTO>,
  ) {
    return this.productService.update(slug, body);
  }

  @Delete('api/products/:slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteProduct(@Param('slug') slug: string) {
    return this.productService.destroy(slug);
  }
}
