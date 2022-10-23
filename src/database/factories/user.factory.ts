import { define } from 'typeorm-seeding';
import { User } from '@app/user/entities/user.entity';

define(User, () => {
  const dto = new User();

  return dto;
});
