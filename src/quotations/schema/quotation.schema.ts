import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuotationDocument = Quotation & Document;

@Schema()
export class Quotation {
    @Prop(raw({
        name: { type: String, required: true },
        email: { type: String, required: false },
        cellphone: { type: Number, required: true }
    }))
    client: Record<string, any>;

    @Prop(raw({
        product_id: {type: String, required:true},
        quantity: { type: Number, required: true },
        unityPrice: { type: String, required: true },
        totalItemPrice: { type: Number, required: true },
    }))
    products: Record<string, any>;

    @Prop({required: true })
    createdAt: Date;

    @Prop({required: true })
    sellerId: String;

    @Prop({required: true })
    payment: String;

    @Prop({required: true })
    delivery: String

    @Prop({required: true })
    totalPrice: number;

    @Prop({required: true })
    status: String;

    @Prop({required: true })
    obs: String;


}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);


