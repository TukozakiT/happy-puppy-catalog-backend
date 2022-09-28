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
      /* não é pra fazer esse NotFound, se vier vazio, tem que OU retornar vazio mesmo, OU retornar 204 Corrija lá em baixo igual aqui*/

      throw new HttpException(`Nenhum orçamento encontrado!`, 204);
      //throw new NotFoundException('Nenhum orçamento encontrado!')
    }

    return quotationData;
  }

  async findOne(id: string) {
    if(!isValidObjectId(id)){

      /*
      O MongoDB usa um tipo interno chamado ObjectId, e ele converte a nossa string em objectID.
      quando a gente envia uma string muito longa, ou muito curta, ele dá erro 500, pq nosso validator no DTO só valida se é uma string,
      sendo string não apita erro lá, mas ao chegar aqui no service, ele vai dar erro pq o mongo n consegue converter para ObjectID
      por isso fazemos a validação aqui e caso esteja errada jogamos um Bad Request.
      */
      throw new HttpException('ID não é um ObjectId Válido para o Mongoose',HttpStatus.BAD_REQUEST);
    }
    try{
      const existingQuotation = await this.quotationModel.findById(id).exec();
      return existingQuotation;
    }catch(err){
      /* essa parte se mantem pq pode ser q o mongoDB dê outro erro, então esse erro fica sendo jogado aqui mesmo. */
      throw new HttpException(err.message,err.status);
    }
    

    /*
    O erro 404 é para quando não se encontra o endpoint. Exemplo se a pessoa tentar acessar um endpoint "quotatiooon" (erro de digitação)
    então a API vai dizer q n existe quotatiooon e vai dar 404.
    já para quando dá certo, ela tem que retornar um 200-299 pq tá OK, ela n errou nada, o servidor está funcionando normal.
    Como o corpo está vazio, tem 2 abordagens possívels: 
    1- simplesmente enviar um dataQuotation vazio, e o front vai se virar com essa info vazia;
    2- enviar um 204 NO CONTENT
    if(!existingQuotation) {
      throw new HttpException(`Orçamento #${id} não encontrado`, 204);
      //throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }*/
    
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {

    /*aqui no update vc vai ter que fazer a mesma coisa que eu fiz lá em cima no get by ID, validando se o id é um object ID e se não for, retornar bad request */

    const existingQuotation = await this.quotationModel.findByIdAndUpdate(id, updateQuotationDto, { new: true });
    
    if(!existingQuotation) {
      throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }

    return existingQuotation;
  }

  async remove(id: string) {
    const deletedQuotation = await this.quotationModel.findByIdAndDelete(id);

    if(!deletedQuotation) {

      /* não é pra fazer esse NotFound, se vier vazio, tem que OU retornar vazio mesmo, OU retornar 204*/
      throw new NotFoundException(`Orçamento #${id} não encontrado`);
    }

    return deletedQuotation;
  }
}
