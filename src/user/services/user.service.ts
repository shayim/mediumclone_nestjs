import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@app/user/entities/dto/user.dto';
import { User } from '@app/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepo.find();
  }

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  async getUserProfile(username: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async followUser(currentUserId: string, username: string) {
    const follower = await this.userRepo.findOne({
      where: { id: currentUserId },
      relations: { follows: true },
    });
    const followed = await this.userRepo.findOneBy({ username });
    if (!follower) {
      throw new UnauthorizedException('You cannot follow');
    }
    if (!followed) {
      throw new BadRequestException('the followed user not found');
    }
    if (follower.id === followed.id) {
      throw new BadRequestException(
        'the follower and the followed cannot be the same person',
      );
    }

    const followedIndex = follower.follows.findIndex(
      (f) => f.id === followed.id,
    );

    // follow or un-follow
    followedIndex === -1
      ? follower.follows.push(followed)
      : follower.follows.splice(followedIndex, 1);

    await this.userRepo.save(follower);
    return follower;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    let user = this.userRepo.create(dto);
    user = await this.userRepo.save(user);
    return user;
  }

  async updateUser(id: string, userDto: UpdateUserDto) {
    console.log(userDto);
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');

    return this.userRepo.save(Object.assign(user, userDto));
  }

  async removeUser(id: string) {
    const user = await this.findById(id);
    if (user) {
      await this.userRepo.remove(user);
    }
  }
}
