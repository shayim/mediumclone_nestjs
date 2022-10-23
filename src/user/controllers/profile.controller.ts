import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUserMiddleware } from '../middlewares/current-user.middleware';
import { UserService } from '../services/user.service';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  getUserProfile(@Param('username') username: string) {
    return this.userService.getUserProfile(username);
  }

  @Post(':username/follow')
  async followUser(
    @CurrentUser('sub') currentUserId: string,
    @Param('username') username: string,
  ) {
    return this.userService.followUser(currentUserId, username);
  }
}
