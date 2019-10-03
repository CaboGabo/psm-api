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

@Controller('api/details')
export class DetailsController {
  constructor(private detailService: DetailsService) {}

  @Get(':slug')
  showOneProduct(@Param('slug') slug) {
    return this.detailService.showOne(slug);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createProduct(@Body() body: DetailDTO) {
    return this.detailService.create(body);
  }

  @Put(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('slug') slug: string, @Body() body: Partial<DetailDTO>) {
    return this.detailService.update(slug, body);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteProduct(@Param('slug') slug: string) {
    return this.detailService.destroy(slug);
  }
}
