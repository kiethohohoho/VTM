import { type DatePickerProps } from '@progress/kendo-react-dateinputs';
import { type FieldValidatorType } from '@progress/kendo-react-form';

import { type ColorBasic } from '../common/type';
export interface IDatePickerRoot extends DatePickerProps {
  isForm?: boolean;
  name: string;
  touched?: boolean;
  visited?: boolean;
  valid?: boolean;
  typeColor?: ColorBasic;
  validatorTypes?: FieldValidatorType | FieldValidatorType[];
}

export interface IDatePickerComponent extends Omit<IDatePickerRoot, 'isForm'> {}
