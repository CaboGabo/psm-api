import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailEntity } from './detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailEntity])],
  providers: [DetailsService],
  controllers: [DetailsController],
})
export class DetailsModule {}
