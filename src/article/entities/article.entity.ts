import { EntityBase } from '@app/user/entities/entity-base.entity';
import { User } from '@app/user/entities/user.entity';
import { randomBytes } from 'crypto';
import { pinyin } from 'pinyin-pro';
import * as isChinese from 'is-chinese';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'articles' })
export class Article extends EntityBase {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  body: string;

  @Column('simple-array', { default: [] })
  tagList: string[];

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @BeforeInsert()
  private getSlug() {
    if (isChinese(this.title)) {
      this.title = pinyin(this.title, {
        toneType: 'none',
        v: true,
        nonZh: 'removed',
      });
    }

    this.slug = `${this.title.replace(/\s+/g, '-')}-${randomBytes(8).toString(
      'hex',
    )}`;
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
