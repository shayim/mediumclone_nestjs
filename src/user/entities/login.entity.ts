import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '@app/user/entities/user.entity';
import { EntityBase } from './entity-base.entity';

@Entity({ name: 'logins' })
export class Login extends EntityBase {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
