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
import { AuthModule } from './auth/auth.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    DetailsModule,
    ImagesModule,
    ClientsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
