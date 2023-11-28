/// custom Option
interface Option {
  value: number | string;
  content: string;
  disabled?: boolean;
}

export interface RadioCommonProps {
  value: number | string;
  onChange: (value: number | string | any) => void;
  options: Option[];
  className?: string;
}
