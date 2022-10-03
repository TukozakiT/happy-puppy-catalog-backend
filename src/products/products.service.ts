import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable() // decorator
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){
/* Primeiro de tudo, o NestJS está recendo um Model do Mongoose. aqui ele pede pra vc especificar qual collection do mongoDB ´pertence o Model. nesse caso o Model<ProductDocument> significa q é um Model dos produtos */
  }

  async create(createProductDto: CreateProductDto) {
    /** o DTO é onde a gente faz a tipagem do objeto que vamos receber do frontend. DTO é data transfer object. Vamos receber do front e depois jogar pra dentro do mongo usando o productModel que criamos lá em cima com a ajuda do Mongoose */
    const createdProduct = new this.productModel(createProductDto); //isso é o mongoose em ação
    return await createdProduct.save();//outra função do mongoose pra salvar no BD o novo produto
  }

  async findAll() {   //get all???
    const resultado = await this.productModel.find().exec();//mongooseeeee!!!
    return resultado;

    // poderia ser 
    // return await this.productModel.find().exec();
  }

  async findOne(id: string) {    //poderi ser getById??
    return await this.productModel.findById(id).exec();//olha o mongoose de novo
  }

  async update(id: string, updateProductDto: UpdateProductDto) {  // Aqui vc vai ter que fazer uma mistura do findByID (usando o ID pra buscar o produto) e o create (usando o DTO pra editar o produto) Vc pode procurar na documentação do mongoose como que faz um findOneAndUpdate, ou busca tutoriais no google pra entender como o mongoose faz isso 
    await this.productModel.findOneAndUpdate({ _id: id }, updateProductDto).exec();
    return this.findOne(id);
  }

    async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }


}
