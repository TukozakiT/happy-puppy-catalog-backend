import { Module } from '@nestjs/common';
import { MediaFileService } from './media-file.service';

@Module({
  providers: [MediaFileService],
  exports:[MediaFileService]
})
export class MediaFileModule {


}
