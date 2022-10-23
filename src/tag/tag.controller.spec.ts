import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from '@app/tag/tag.controller';

describe('TagController', () => {
  let controller: TagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
    }).compile();

    controller = module.get<TagController>(TagController);
  });

  xit('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
