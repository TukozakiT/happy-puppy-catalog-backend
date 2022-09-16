import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })//é obrigatório
  name: string;

  @Prop()//é opcional
  age: number;

  @Prop(raw({
    subprop1: { type: String, required: true }, //sub propriedade obrigatória
    subprop2: { type: Number }//sub propriedade opcional
  }))
  test: Record<string, any>;//o teste é do tipo objeto com 2 sub propriedades

}

export const ProductSchema = SchemaFactory.createForClass(Product);