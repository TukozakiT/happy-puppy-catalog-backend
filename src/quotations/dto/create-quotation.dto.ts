export class CreateQuotationDto {
    client: ClientDetails;
    products: ProductDetails;
    createdAt: Date;
    sellerId: string;
    payment: string;
    delivery: string;
    totalPrice: number;
    status: string;
    obs: string;
}

export interface ClientDetails {
    name: string;
    email?: string;
    cellphone: number;
}

export interface ProductDetails {
    product_id: string;
    quantity: number;
    unity: string;
    unityPrice: string;
    totalItemPrice: number;
}
