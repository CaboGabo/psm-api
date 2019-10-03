import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { DetailEntity } from '../details/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, DetailEntity])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
