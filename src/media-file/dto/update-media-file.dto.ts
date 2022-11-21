import { PartialType } from '@nestjs/mapped-types';
import { IsString} from "class-validator";
import { CreateMediaFileDto } from './create-media-file.dto';

export class UpdateMediaFileDto extends PartialType(CreateMediaFileDto) {
    @IsString()
    url:string;
}
