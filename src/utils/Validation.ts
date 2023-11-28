/* eslint-disable no-unreachable-loop */
import { type KeyValue } from '@progress/kendo-react-form';

import { Helper } from '@/utils/Helper';
import { ValidatorService } from '@/utils/validator';

interface IValidatorComponent {
  values: any;
  validators: Record<string, VALIDATOR[]>;
}

export enum VALIDATOR {
  EMPTY = 1,
  IS_NUMBER,
}

const FuncCheckValidator: Record<VALIDATOR, any> = {
  [VALIDATOR.EMPTY]: (value: any, name: string): KeyValue<string> | undefined =>
    ValidatorService.requiredValidator(value, name),
  [VALIDATOR.IS_NUMBER]: (value: any, name: string): KeyValue<string> | undefined =>
    ValidatorService.numberValidator(value, name),
};

const ValidatorComponent = ({ validators, values }: IValidatorComponent) => {
  if (Helper.isEmpty(values)) {
    return {
      VALIDATION_SUMMARY: 'Please fill at least one of the following fields',
    };
  }
  let message = {};

  for (const validator in validators) {
    const listValidator = validators[validator];
    const valuesOfField = values[validator];

    for (let index = 0; index < listValidator.length; index++) {
      const typeValidator = listValidator[index];
      const isValidator = FuncCheckValidator[typeValidator](valuesOfField, validator);
      if (isValidator) {
        message = {
          ...message,
          ...FuncCheckValidator[typeValidator](valuesOfField, validator),
        };
      }
    }
  }

  return message;
};

export default ValidatorComponent;
