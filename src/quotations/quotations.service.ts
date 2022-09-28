import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Quotation, QuotationDocument } from './schema/quotation.schema';

@Injectable()
export class QuotationsService {
  constructor(@InjectModel(Quotation.name) private quotationModel: Model<QuotationDocument>) {
    
  }

  async create(createQuotationDto: CreateQuotationDto) {
    const createdQuotation = await new this.quotationModel(createQuotationDto);
    return createdQuotation.save();
  }

  async findAll() {
    const quotationData = await this.quotationModel.find().exec();

    if(!quotationData || quotationData.length === 0) {
      throw new NotFoundException('Nenhum orçamento encontrado!')
    }

    return quotationData;
  }

  async findOne(id: string) {
    const existingQuotation = await this.quotationModel.findById(id).exec();

    if(!existingQuotation) {
      throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }
    return existingQuotation;
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    const existingQuotation = await this.quotationModel.findByIdAndUpdate(id, updateQuotationDto, { new: true });
    
    if(!existingQuotation) {
      throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }

    return existingQuotation;
  }

  async remove(id: string) {
    const deletedQuotation = await this.quotationModel.findByIdAndDelete(id);

    if(!deletedQuotation) {
      throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }

    return deletedQuotation;
  }
}
