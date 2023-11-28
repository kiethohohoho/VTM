import { type FieldValidatorType } from '@progress/kendo-react-form';

import { type ColorBasic } from '../common/type';

export interface IUploadRoot {
  isForm?: boolean;
  name: string;
  touched?: boolean;
  visited?: boolean;
  valid?: boolean;
  validatorTypes?: FieldValidatorType | FieldValidatorType[];
  typeColor?: ColorBasic;
  helperText?: string;
  multi?: boolean;
  defaultList?: string[] | any;
  onChange?: (event: any) => void;
  onShow?: () => void;
  onGetIndexRemove?: (index: number) => void;
  isFile?: boolean;
  type?: string;
  disable?: boolean;
  label?: string;
  controlled?: boolean;
  value?: any;
}

export interface IUploadComponent extends Omit<IUploadRoot, 'isForm'> {}

export interface IReturnOnChange {
  id: number;
  file: File;
}

export interface ICreateBaseULR {
  id: number;
  src: string;
}
