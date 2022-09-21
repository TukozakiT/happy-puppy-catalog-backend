import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { Quotation, QuotationSchema } from './schema/quotation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quotation.name, schema: QuotationSchema }])],
  controllers: [QuotationsController],
  providers: [QuotationsService]
})
export class QuotationsModule {}
