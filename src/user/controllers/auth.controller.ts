import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@app/user/services/auth.service';
import { SignUpDto } from '@app/user/entities/dto/SignUp.dto';
import { SignInDto } from '@app/user/entities/dto/SignIn.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('signIn')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@CurrentUser() user: { sub: string }) {
    return user;
  }
}
