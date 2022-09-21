import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sku: string;

  @Prop()
  brand: string;

  @Prop()
  line: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop(raw({
    id: { type: String, required: true }, 
    name: { type: Number }
  }))
  category: Record<string, any>;


  @Prop(raw({
    indication: { type: String},
    composition: { type: String, required: true },
    size: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String},
    flavor: { type: String},
  }))
  details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);