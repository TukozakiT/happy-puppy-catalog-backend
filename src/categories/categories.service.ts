import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';


@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  async findAll() {
    const resultado = await this.categoryModel.find().exec();
    return resultado;
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryModel.findByIdAndUpdate({ _id: id }, updateCategoryDto).exec();
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
