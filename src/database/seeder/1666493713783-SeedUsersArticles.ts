import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '@app/user/entities/user.entity';
import { Login } from '@app/user/entities/login.entity';
import { Article } from '@app/article/entities/article.entity';
import { SignUpDto } from '@app/user/entities/dto/SignUp.dto';
import { CreateArticleDto } from '@app/article/entities/dto/create-article.dto';

export class SeedUsersArticles1666493713783 implements MigrationInterface {
  name = 'SeedUsersArticles1666493713783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(User);
    const loginRepo = queryRunner.manager.getRepository(Login);
    const articleRepo = queryRunner.manager.getRepository(Article);

    const signupDto: SignUpDto = {
      email: faker.internet.email(),
      password: 'aB646464.',
    };
    const user = await userRepo.save(userRepo.create(signupDto));
    await loginRepo.save(loginRepo.create({ ...signupDto, user }));

    const articleDto: CreateArticleDto = {
      title: faker.lorem.words(2),
      desc: faker.lorem.words(4),
      body: faker.lorem.paragraph(2),
      tagList: faker.lorem.words(2).split(/\s+/),
    };
    await articleRepo.save(articleRepo.create({ ...articleDto, author: user }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
