import { type DropDownListProps } from '@progress/kendo-react-dropdowns';
import { type FieldValidatorType } from '@progress/kendo-react-form';

import { type ColorBasic } from '../common/type';
export interface IDropDownRoot extends DropDownListProps {
  isForm?: boolean;
  name: string;
  touched?: boolean;
  visited?: boolean;
  valid?: boolean;
  typeColor?: ColorBasic;
  validatorTypes?: FieldValidatorType | FieldValidatorType[];
}
export interface IDropDownComponent extends Omit<IDropDownRoot, 'isForm'> {}

export interface IItemDataDropDown {
  id: any;
  text: string;
}
