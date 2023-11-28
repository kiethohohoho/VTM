import { type Dayjs } from 'dayjs';
import { type ReactNode } from 'react';

export interface DatePickerCommonProps {
  onChange?: (date: any, dateString: string) => void;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
  defaultValue?: Dayjs | undefined | any;
  showTime?: boolean | object;
  format?: string | string[];
  disabledDate?: (current: Dayjs | undefined | any) => boolean;
  placeholder?: string;
  showNow?: boolean;
  disabled?: boolean;
  suffixIcon?: ReactNode;
  maxCount?: number | undefined;
}
