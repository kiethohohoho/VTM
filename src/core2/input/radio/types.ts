import { type RadioGroupProps } from '@progress/kendo-react-inputs';

export interface IRadioGroupRoot extends RadioGroupProps {
  isForm?: boolean;
  name: string;
  id: string;
  label?: string;
  data: IDataRadioRoot[];
}

export interface IDataRadioRoot {
  label: string;
  value: any;
}

export interface IRadioGroupComponent extends Omit<IRadioGroupRoot, 'isForm'> {}
