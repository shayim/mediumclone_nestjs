import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'password', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const constraints = args.constraints ?? [];
    const { len, upper, special } = constraints[0] || {};

    const length = `(?=.{${len || 6},})`;
    const ex = `(?=.*\\d)(?=.*[a-z])${upper ? '(?=.*[A-Z])' : ''}${
      special && typeof special === 'string' && special.length > 0
        ? '(?=.*[' + special + '])'
        : special && typeof special === 'boolean'
        ? '(?=.*[-~`!@#$%^&*()_+={[}.])'
        : ''
    }`;

    return RegExp(`${ex}${length}`).test(value);
  }

  defaultMessage?(args?: ValidationArguments): string {
    console.log(args);
    return `invalid password`;
  }
}
