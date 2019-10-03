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

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get(':slug')
  showOneProduct(@Param('slug') slug) {
    return this.productService.showOne(slug);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createProduct(@Body() body: ProductDTO) {
    return this.productService.create(body);
  }

  @Put(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Param('slug') slug: string,
    @Body() body: Partial<ProductDTO>,
  ) {
    return this.productService.update(slug, body);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteProduct(@Param('slug') slug: string) {
    return this.productService.destroy(slug);
  }
}
