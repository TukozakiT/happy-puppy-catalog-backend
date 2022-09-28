import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  async create(@Res() response, @Body() createQuotationDto: CreateQuotationDto) {
    try {
      const createdQuotation = await this.quotationsService.create(createQuotationDto);
      
      return response.status(HttpStatus.CREATED).json({
        message: 'Orçamento criado com sucesso!',
        createdQuotation,
      });
    }catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erro: Orçamento não pôde ser criado.',
        error: 'Bad Request'
      });
    }
    
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const quotationData = await this.quotationsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Todos os orçamentos foram encontrados com sucesso', quotationData,
      });
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingQuotation = await this.quotationsService.findOne(id);
      
      return response.status(HttpStatus.OK).json({
        message: 'Orçamento encontrado com sucesso', existingQuotation,
      });
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    try {
      const existingQuotation = await this.quotationsService.update(id, updateQuotationDto);

      return response.status(HttpStatus.OK).json({
        message: 'Orçamento foi atualizado com sucesso', existingQuotation,
      });
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
    
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try{
      const deletedQuotation = await this.quotationsService.remove(id);

      return response.status(HttpStatus.OK).json({
        message:'Orçamento deletado com sucesso', deletedQuotation,
      });
    }catch (err) {
      return response.status(err.status).json(err.response);
    }
    
  }
}
