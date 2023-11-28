import { type InputProps } from 'antd';
export interface CustomInputProps extends InputProps {
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnter?: (value: string) => void;
}

export interface CustomInputRef {
  focus: () => void;
  getValue: () => string;
}
