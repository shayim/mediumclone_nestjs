import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './entities/dto/create-article.dto';
import { pinyin } from 'pinyin-pro';
import * as isChinese from 'is-chinese';
import { randomBytes } from 'crypto';
import { UpdateArticleDto } from './entities/dto/update-article.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
    private dataSource: DataSource,
  ) {}

  async fidnAll(
    userId: string,
    {
      tag,
      author,
      favorite,
      limit = 20,
      offset = 0,
      desc = true,
      orderBy = 'createdAt',
    }: any,
  ) {
    const query = this.articleRepo
      .createQueryBuilder('articles')
      .orderBy(`articles.${orderBy}`, desc ? 'DESC' : 'ASC')
      .skip(offset)
      .take(limit);

    if (tag) {
      query.andWhere('articles.tagList LIKE :tag', { tag: `%${tag}%` });
    }

    if (author) {
      query.innerJoinAndSelect(
        'articles.author',
        'author',
        'author.username LIKE :author',
        { author: `%${author}%` },
      );
    } else {
      query.innerJoinAndSelect('articles.author', 'author');
    }

    if (favorite) {
      const author = await this.dataSource.getRepository(User).findOne({
        where: { username: favorite },
        relations: { favorites: true },
      });

      const ids = author?.favorites.map((el) => el.id) || [];

      if (ids.length > 0) {
        query.andWhere('articles.id IN (:...ids)', { ids });
      } else {
        query.andWhere('1=0');
      }
    }
    const articles = await query.getMany();
    const count = await query.getCount();

    const currentUser = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: userId }, relations: { favorites: true } });

    const articlesWithUserFavorited = articles.map((article) =>
      currentUser.favorites.some((f) => f.id === article.id)
        ? { ...article, favorited: true }
        : { ...article, favorited: false },
    );

    return { articles: articlesWithUserFavorited, count };
  }

  findBySlug(slug: string): Promise<Article> {
    return this.articleRepo.findOne({ where: { slug }, relations: ['author'] });
  }

  async create(userId: string, dto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepo.create({
      ...dto,
      slug: this.getSlug(dto.title),
      author: { id: userId },
    });
    await this.articleRepo.save(article);
    return article;
  }

  async update(userId: string, slug: string, dto: UpdateArticleDto) {
    const article = await this.articleRepo.findOne({
      where: { slug },
      relations: ['author'],
    });

    if (!article) throw new NotFoundException('article not found');
    if (article.author.id !== userId) throw new UnauthorizedException();

    return this.articleRepo.save({
      ...article,
      ...dto,
      ...(dto.title && { slug: this.getSlug(dto.title) }),
    });
  }

  async likeIt(userId: string, slug: string) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: userId }, relations: { favorites: true } });

    if (!user) throw new UnauthorizedException('You are not allowed likeIt.');
    const article = await this.articleRepo.findOneBy({ slug });
    if (!article) throw new NotFoundException('Your likeIt article not found.');

    const likedIndex = user.favorites.findIndex(
      (liked) => liked.id === article.id,
    );

    // like it
    if (likedIndex == -1) {
      user.favorites.push(article);
      await this.dataSource.getRepository(User).save(user);

      article.favoritesCount = article.favoritesCount + 1;
      return await this.articleRepo.save(article);
    }

    // dislike it
    user.favorites.splice(likedIndex, 1);
    await this.dataSource.getRepository(User).save(user);
    article.favoritesCount = article.favoritesCount - 1;
    return await this.articleRepo.save(article);
  }

  async remove(userId: string, slug: string) {
    const article = await this.articleRepo.findOne({
      where: { slug, author: { id: userId } },
    });

    article && (await this.articleRepo.remove(article));
  }

  private getSlug(title: string): string {
    if (isChinese(title)) {
      title = pinyin(title, { toneType: 'none', v: true, nonZh: 'removed' });
    }

    return `${title.replace(/\s+/g, '-')}-${randomBytes(8).toString('hex')}`;
  }
}
