import { promisify } from 'util';
import { Repository, DataSource } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { SignUpDto } from '@app/user/entities/dto/SignUp.dto';
import { Login } from '@app/user/entities/login.entity';
import { UserService } from '@app/user/services/user.service';
import { User } from '@app/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login) private readonly loginRepo: Repository<Login>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  private async userToken(user: User) {
    const signAsync = promisify<object, Secret, SignOptions, string>(sign);
    const userToken = {
      token: await signAsync(
        { sub: user.id, username: user.username, email: user.email },
        'secret',
        {
          expiresIn: '1d',
        },
      ),
    };

    return userToken;
  }

  async signIn(body: SignUpDto) {
    const login = await this.loginRepo.findOne({
      where: { email: body.email },
      relations: { user: true },
    });

    if (!login || !(await compare(body.password, login.password))) {
      throw new UnauthorizedException('login failed');
    }

    const user = await this.userService.findById(login.user.id);
    if (!user) throw new UnauthorizedException('login failed');

    return this.userToken(user);
  }

  async signup(dto: SignUpDto) {
    return await this.dataSource.transaction(async (em) => {
      const user = this.userRepo.create(dto);
      const newUser = await em.save(user);

      const login = this.loginRepo.create({ ...dto, user: newUser });
      await em.save(login);

      return this.userToken(newUser);
    });
  }

  async findByEmail(email): Promise<Login> {
    return this.loginRepo.findOne({ where: { email } });
  }
}
