/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, type TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useCallback } from 'react';
interface Props extends TimeRangePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  onChange?: (value: any) => void;
}
const DateTimePicker = (props: Props) => {
  const { value, onChange, ...rest } = props;
  console.log('props', props);
  const handleChane = useCallback(
    (dates: any) => {
      onChange?.({
        from: dayjs(dates[0]).startOf('day').toISOString(),
        to: dayjs(dates[1]).endOf('day').toISOString(),
      });
    },
    [onChange],
  );
  return (
    <DatePicker.RangePicker
      style={{ width: '100%' }}
      placeholder={['From', 'To']}
      onChange={handleChane}
      format={'DD/MM/YYYY'}
      value={[value?.from ? dayjs(value?.from) : null, value?.from ? dayjs(value?.to) : null]}
      {...rest}
    />
  );
};

export default DateTimePicker;
