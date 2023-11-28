import { DatePicker } from 'antd';
import React, { memo } from 'react';

import { type DatePickerCommonProps } from './type.';
// eslint-disable-next-line react/display-name
export const DatePickerAntd: React.FC<DatePickerCommonProps> = memo(
  ({ onChange, picker, defaultValue, showTime, format, disabledDate, placeholder, showNow, disabled, suffixIcon }) => {
    return (
      <DatePicker
        className='date-picker-common'
        placeholder={placeholder}
        defaultValue={defaultValue}
        showTime={showTime}
        onChange={onChange}
        picker={picker}
        format={format}
        disabledDate={disabledDate}
        suffixIcon={suffixIcon}
        showNow={showNow}
        disabled={disabled}
      />
    );
  },
);
