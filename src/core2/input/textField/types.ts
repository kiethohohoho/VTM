import { type FieldValidatorType } from '@progress/kendo-react-form';
import { type InputProps } from '@progress/kendo-react-inputs';

import { type ColorBasic } from '@/core2/common/type';

export interface IInputRoot extends InputProps {
  isForm?: boolean;
  name: string;
  touched?: boolean;
  visited?: boolean;
  valid?: boolean;
  validatorTypes?: FieldValidatorType | FieldValidatorType[];
  typeColor?: ColorBasic;
  loading?: boolean;
  helperText?: string;
  labelClassName?: string;
}

export interface IInputRootComponent extends Omit<IInputRoot, 'isForm'> {}
