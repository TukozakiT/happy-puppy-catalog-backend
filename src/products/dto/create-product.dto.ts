export class CreateProductDto {
  name: string;
  sku: string;
  brand?: string;
  line?: string;
  price: number;
  description: string;
  category: Category;
  details: ProductDetails;

}

export interface Category{
    id:string;
    name:string;
}

export interface ProductDetails{
    indication?:String;
    composition: String;
    size: Number;
    weight: Number;
    color?: String;
    flavor?:  String;
}
