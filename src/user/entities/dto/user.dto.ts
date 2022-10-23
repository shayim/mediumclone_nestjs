import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  img: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
