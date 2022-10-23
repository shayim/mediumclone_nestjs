import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from '@app/article/entities/dto/create-article.dto';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './entities/dto/update-article.dto';
import { DataSource, QueryBuilder } from 'typeorm';

@UseGuards(AuthGuard)
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(@CurrentUser('sub') userId: string, @Query() query: any) {
    return this.articleService.fidnAll(userId, query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string): Promise<Article> {
    return this.articleService.findBySlug(slug);
  }

  @Post()
  async create(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateArticleDto,
  ) {
    return this.articleService.create(userId, dto);
  }

  @Post(':slug/likeIt')
  async likeIt(
    @CurrentUser('sub') userId: string,
    @Param('slug') slug: string,
  ) {
    return this.articleService.likeIt(userId, slug);
  }

  @Put(':slug')
  async update(
    @CurrentUser('sub') userId: string,
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articleService.update(userId, slug, dto);
  }

  @Delete(':slug')
  remove(@CurrentUser('sub') userId: string, @Param('slug') slug: string) {
    return this.articleService.remove(userId, slug);
  }
}
