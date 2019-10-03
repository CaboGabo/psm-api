import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { DetailsModule } from './details/details.module';
import { ImagesModule } from './images/images.module';
import { ClientsModule } from './clients/clients.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [UsersModule, CategoriesModule, ProductsModule, DetailsModule, ImagesModule, ClientsModule, OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
