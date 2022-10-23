import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetProductDto {

    @IsInt()
    @Type(() => Number)
    page: number;

}