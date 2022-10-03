import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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

      throw new HttpException(`Nenhum orçamento encontrado!`, 204);
    }

    return quotationData;
  }

  async findOne(id: string) {
    if(!isValidObjectId(id)){

      throw new HttpException('ID não é um ObjectId Válido para o Mongoose',HttpStatus.BAD_REQUEST);
    }
    
    try{
      const existingQuotation = await this.quotationModel.findById(id).exec();
      if(!existingQuotation) {

        throw new HttpException(`Orçamento #${id} não encontrado`, 204);
      }

      return existingQuotation;
    }catch(err){

      throw new HttpException(err.message, err.status);
    }
    
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    if(!isValidObjectId(id)){

      throw new HttpException('ID não é um ObjectId Válido para o Mongoose',HttpStatus.BAD_REQUEST);
    }

    try {
      const existingQuotation = await this.quotationModel.findByIdAndUpdate(id, updateQuotationDto, { new: true });
      if(!existingQuotation) {
        throw new HttpException(`Orçamento #${id} não encontrado`, 204);
      }

      return existingQuotation;
    }catch(err){

      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    if(!isValidObjectId(id)){

      throw new HttpException('ID não é um ObjectId Válido para o Mongoose',HttpStatus.BAD_REQUEST);
    }

    try {
      const deletedQuotation = await this.quotationModel.findByIdAndDelete(id);
      if(!deletedQuotation) {

      throw new HttpException(`Orçamento #${id} não encontrado`, 204);
      }

      return deletedQuotation;
    }catch(err){

      throw new HttpException(err.message, err.status);
    }
    
  }
}
