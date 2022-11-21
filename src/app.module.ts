import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { QuotationsModule } from './quotations/quotations.module';
import { CategoriesModule } from './categories/categories.module';
import { MediaFileModule } from './media-file/media-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env',}), 
    MongooseModule.forRoot('mongodb://root:asdasd123@happy_puppy_mongodb:27017',{dbName: 'puppydb'}),
    ProductsModule,
    QuotationsModule,
    CategoriesModule,
    MediaFileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
