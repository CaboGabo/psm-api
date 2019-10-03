import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  UsePipes,
  Body,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { DetailDTO } from './detail.dto';

@Controller()
export class DetailsController {
  constructor(private detailService: DetailsService) {}

  @Get('api/details/:slug')
  showOneProduct(@Param('slug') slug) {
    return this.detailService.showOne(slug);
  }

  @Post('api/products/:slugProduct/details')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createProduct(
    @Param('slugProduct') slugProduct: string,
    @Body() body: DetailDTO,
  ) {
    return this.detailService.create(slugProduct, body);
  }

  @Put('api/details/:slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('slug') slug: string, @Body() body: Partial<DetailDTO>) {
    return this.detailService.update(slug, body);
  }

  @Delete('api/details/:slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteProduct(@Param('slug') slug: string) {
    return this.detailService.destroy(slug);
  }
}
