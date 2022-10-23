import { Article } from '@app/article/entities/article.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { EntityBase } from './entity-base.entity';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  img: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @ManyToMany(() => Article)
  @JoinTable()
  favorites: Article[];

  @ManyToMany(() => User)
  @JoinTable({
    joinColumn: { name: 'follower' },
    inverseJoinColumn: { name: 'followed' },
  })
  follows: User[];

  @BeforeInsert()
  defaultUsername() {
    this.username = this.username || this.email.split('@')[0];
  }
}
