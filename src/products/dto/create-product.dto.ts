import { Type } from "class-transformer";
import { IsString, IsNumber, IsObject, ValidateNested, IsOptional } from "class-validator";

export class Category {
  @IsString()
  id: string;
  
  @IsString()
  name: string;
}


export class ProductDetails {
  @IsOptional()
  @IsString()
  indication?: string;

  @IsString()
  composition: string;

  @IsNumber()
  size: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  flavor?:  string;
}


export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  pictureUrl?: string;

  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  line?: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Category)
  category: Category;

  @IsObject()
  @ValidateNested()
  @Type(() => ProductDetails)
  details: ProductDetails;
}
