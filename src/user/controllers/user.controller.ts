import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/user/services/user.service';
import { CreateUserDto, UpdateUserDto } from '@app/user/entities/dto/user.dto';
import { User } from '@app/user/entities/user.entity';
import { AuthGuard } from '@app/user/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  @Post('')
  async createUser(@Body('users') newUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(newUser);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
