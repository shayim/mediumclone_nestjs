import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}
  @Get()
  async getAll(): Promise<{ tags: string[] }> {
    const tags = (await this.tagService.getAll()).map((tag) => tag.name);

    return { tags };
  }
}
