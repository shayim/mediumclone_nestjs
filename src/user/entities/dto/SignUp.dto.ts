import { IsEmail, Validate } from 'class-validator';
import { PasswordValidator } from '@app/user/validators/password.validator';
import { UniqueEmailValidator } from '@app/user/validators/unique-email.validator';

export class SignUpDto {
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;

  @Validate(PasswordValidator, [{ len: 8, special: true, upper: true }])
  password: string;
}
