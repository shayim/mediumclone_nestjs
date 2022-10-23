import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from '@app/user/entities/login.entity';
import { User } from '@app/user/entities/user.entity';
import { AuthController } from '@app/user/controllers/auth.controller';
import { UserController } from '@app/user/controllers/user.controller';
import { UserService } from '@app/user/services/user.service';
import { AuthService } from '@app/user/services/auth.service';
import { UniqueEmailValidator } from '@app/user/validators/unique-email.validator';
import { ProfileController } from '@app/user/controllers/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Login])],
  controllers: [UserController, AuthController, ProfileController],
  providers: [UserService, AuthService, UniqueEmailValidator],
})
export class UserModule {}
