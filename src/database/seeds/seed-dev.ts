import { Article } from '@app/article/entities/article.entity';
import { Login } from '@app/user/entities/login.entity';
import { User } from '@app/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class DevSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Login)()
      .map(async (login: Login) => {
        const user: User = await factory(User)().create({
          email: login.email,
          username: login.email.split('@')[0],
        });
        login.user = user;

        const articlesCount = Math.floor(Math.random() * 5);

        await factory(Article)().createMany(articlesCount, {
          author: user,
        });

        return login;
      })
      .createMany(5);
  }
}
