import { type CSSProperties } from 'react';

export interface SelectionCommonProps {
  onChange?: (value: any) => void;
  onClear?: () => void;
  options: any[];
  label?: string;
  defaultValue?: any;
  value?: any;
  required?: boolean;
  allowClear?: boolean;
  mode?: string;
  placeholder?: string;
  filterOption?: any;
  onSearch?: (value: string) => void;
  keyLabel?: string;
  valueLabel?: string;
  onAddNew?: any;
  hasAddNewOption?: boolean;
  placeholderOptionAdd?: string;
  disable?: boolean;
  style?: CSSProperties;
}
