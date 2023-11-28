import {
  DateRangePicker,
  type DateRangePickerChangeEvent,
  type DateRangePickerProps,
  type SelectionRange,
} from '@progress/kendo-react-dateinputs';
import React from 'react';

import CustomEndDateInput from './components/customEndDateInput';
import CustomStartDateInput from './components/customStartDateInput';
interface IDateRangePickerProps extends DateRangePickerProps {
  nameStartDate?: string;
  nameEndDate?: string;
  labelStart?: string;
  labelEnd?: string;
  onChange?: (e: DateRangePickerChangeEvent) => void;
  defaultValue?: SelectionRange;
}

const DateRangePickerCore = (props: IDateRangePickerProps) => {
  const {
    nameStartDate,
    nameEndDate,
    labelEnd,
    labelStart,
    onChange,
    defaultValue = { start: null, end: null },
    ...other
  } = props;

  return (
    <DateRangePicker
      className='w-full'
      calendarSettings={{}}
      startDateInput={() => (
        <CustomStartDateInput
          name={nameStartDate || 'startDate'}
          label={labelStart || 'core.dateRangePicker.startDate'}
        />
      )}
      endDateInput={() => (
        <CustomEndDateInput
          name={nameEndDate || 'endDate'}
          label={labelEnd || 'core.dateRangePicker.endDate'}
        />
      )}
      onChange={onChange}
      defaultValue={defaultValue}
      {...other}
    />
  );
};

export default DateRangePickerCore;
