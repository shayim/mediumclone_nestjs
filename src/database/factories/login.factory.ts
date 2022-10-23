import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Login } from '@app/user/entities/login.entity';

define(Login, () => {
  const dto = new Login();
  dto.email = faker.internet.email();
  dto.password = 'aB646464.';

  return dto;
});
