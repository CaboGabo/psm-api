import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Body,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { AuthGuard } from '@nestjs/passport';
import { ImageDTO } from './image.dto';

@Controller()
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('api/images/:id')
  showOneProduct(@Param('id') id) {
    return this.imageService.showOne(id);
  }

  @Post('api/details/:slugDetail/images')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createProduct(
    @Param('slugDetail') slugDetail: string,
    @Body() body: ImageDTO,
  ) {
    return this.imageService.create(slugDetail, body);
  }

  @Put('api/images/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('id') id: string, @Body() body: Partial<ImageDTO>) {
    return this.imageService.update(id, body);
  }

  @Delete('api/images/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  deleteProduct(@Param('id') id: string) {
    return this.imageService.destroy(id);
  }
}
