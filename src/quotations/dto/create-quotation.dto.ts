import { Type } from "class-transformer";
import { IsString, IsDateString, IsNumber, IsEmail, IsObject, ValidateNested } from "class-validator";


export class ClientDetails {
    @IsString()
    name: string;

    @IsEmail()
    email?: string;

    @IsNumber()
    cellphone: number;
}

export class ProductDetails {
    @IsString()
    product_id: string;

    @IsNumber()
    quantity: number;

    @IsString()
    unity: string;

    @IsString()
    unityPrice: string;

    @IsNumber()
    totalItemPrice: number;
}

export class CreateQuotationDto {

    @IsObject()
    @ValidateNested()
    @Type(() => ClientDetails)
    client: ClientDetails;

    @IsObject()
    @ValidateNested()
    @Type(() => ProductDetails)
    products: ProductDetails;
    
    @IsDateString()
    createdAt: Date;
    @IsString()
    sellerId: string;

    @IsString()
    payment: string;

    @IsString()
    delivery: string;

    @IsNumber()
    totalPrice: number;

    @IsString()
    status: string;

    @IsString()
    obs: string;
}


