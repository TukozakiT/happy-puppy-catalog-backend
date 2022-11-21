import { Test, TestingModule } from '@nestjs/testing';
import { MediaFileService } from './media-file.service';

describe('MediaFileService', () => {
  let service: MediaFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaFileService],
    }).compile();

    service = module.get<MediaFileService>(MediaFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
