import { type KeyValue } from '@progress/kendo-react-form';

import { Helper } from '../Helper';

export class ValidatorService {
  static stringValidator(value: string) {
    return Helper.exactTypeOf(value) === 'string' ? '' : 'Please enter a string.';
  }

  static numberValidator(value: number, name: string): KeyValue<string> | undefined {
    if (Helper.exactTypeOf(value) === 'number') {
      return;
    }
    return {
      [name]: 'Please enter a number.',
    };
  }

  static booleanValidator(value: boolean) {
    return Helper.exactTypeOf(value) === 'boolean' ? '' : 'Please enter a boolean.';
  }

  static arrayValidator<T>(value: T[]) {
    return Helper.exactTypeOf(value) === 'array' ? '' : 'Please enter an array.';
  }

  static termsValidator(value: string): string {
    return value ? '' : "It's required to agree with Terms and Conditions.";
  }

  static emailValidator(value: string): string {
    return Helper.isEmail(value) ? '' : 'Email is not in a valid format.';
  }

  static requiredValidator(value: any, name: string): KeyValue<string> | undefined {
    if (value) {
      return;
    }
    return {
      [name]: 'This field is required',
    };
  }

  static passwordValidator(value: string): string {
    return value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';
  }

  static confirmPasswordValidator(password: string, confirmPassword: string): string {
    return password === confirmPassword ? '' : 'Password and confirm password does not match';
  }

  static formValidator(values: { username: string; email: string }): Record<string, string> {
    const userName = values.username;
    const emailValue = values.email;

    if (userName && emailValue && Helper.isEmail(emailValue)) {
      return {};
    }

    return {
      VALIDATION_SUMMARY: 'Please fill in the following fields.',
      username: !userName ? 'User Name is required.' : '',
      email: emailValue && Helper.isEmail(emailValue) ? '' : 'Email is required and should be in a valid format.',
    };
  }
}
