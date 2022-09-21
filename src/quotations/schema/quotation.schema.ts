import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuotationDocument = Quotation & Document;

@Schema()
export class Quotation {
    @Prop(raw({
        name: { type: String, required: true },
        email: { type: String },
        cellphone: { type: Number, required: true }
    }))
    client: Record<string, any>;

    @Prop(raw({
        productId: { type: Number, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unity: { type: String, required: true },
        unityPrice: { type: Number, required: true },
        totalItemPrice: { type: Number, required: true },
    }))
    product: Record<string, any>;

    @Prop(raw({
        quotationId: { type: Number, required: true },
        createdAt: { type: Date, required: true },
        sellerId: { type: String },
        payment: { type: String, required: true },
        delivery: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        status: { type: String, required: true },
        obs: { type: String }

    }))
    requestInfo: Record<string, any>;


}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);



