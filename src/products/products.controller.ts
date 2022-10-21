import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  

  @Post()//Aqui dentro vc coloca a URL
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() getProductDto: GetProductDto) {
    return this.productsService.findAll(getProductDto.page);
  }

  @Get(':id')//esse :(dois pontos) é que vc recebe uma variavel na URL
  findOne(@Param('id') id: string) { //aqui está passando o valor da URL pra dentro da variavel "id"
    return this.productsService.findOne(id); //aqui chama o service
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}