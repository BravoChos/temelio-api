import { Test, TestingModule } from '@nestjs/testing';
import { FoundationController } from './foundation.controller';
import { FoundationService } from './foundation.service';

describe('FoundationController', () => {
  let controller: FoundationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoundationController],
      providers: [FoundationService],
    }).compile();

    controller = module.get<FoundationController>(FoundationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
