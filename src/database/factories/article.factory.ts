import { Article } from '@app/article/entities/article.entity';
import { faker } from '@faker-js/faker';
import { randomBytes } from 'crypto';
import { define } from 'typeorm-seeding';

define(Article, () => {
  const article = new Article();
  article.title = faker.lorem.words(Math.floor(Math.random() * 3 + 2));
  article.slug = `${article.title.replace(/\s+/g, '-')}-${randomBytes(
    8,
  ).toString('hex')}`;
  article.desc = faker.lorem.words(Math.floor(Math.random() * 3 + 5));
  article.body = faker.lorem.paragraph();
  article.tagList = faker.lorem
    .words(Math.floor(Math.random() * 3 + 1))
    .split(/\s+/);

  return article;
});
