import { type TimeRangePickerProps } from 'antd';

export interface RangePickerCommonProps extends TimeRangePickerProps {
  onChange?: (dates: any, dateStrings: [string, string]) => void;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined;
  showTime?: boolean;
  value?: any;
}
