import { Test, TestingModule } from '@nestjs/testing';
import { FoundationService } from './foundation.service';

describe('FoundationService', () => {
  let service: FoundationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoundationService],
    }).compile();

    service = module.get<FoundationService>(FoundationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
