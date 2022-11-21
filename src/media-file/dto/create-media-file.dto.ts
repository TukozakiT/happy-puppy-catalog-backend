import { IsString} from "class-validator";
export class CreateMediaFileDto {
    @IsString()
    name:string;

    @IsString()
    productId:string;
}
