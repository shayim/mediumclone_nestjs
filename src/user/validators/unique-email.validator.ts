import { AuthService } from '@app/user/services/auth.service';
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private authService: AuthService) {}
  async validate(email: string, args?: ValidationArguments): Promise<boolean> {
    return !(await this.authService.findByEmail(email));
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `${args.value} has been registered.`;
  }
}
