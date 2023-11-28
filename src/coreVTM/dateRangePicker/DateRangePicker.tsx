import { DatePicker } from 'antd';
import React, { type FC, memo } from 'react';

import { type RangePickerCommonProps } from './type';
const { RangePicker } = DatePicker;

const RangePickerCommon: FC<RangePickerCommonProps> = ({ onChange }) => {
  return (
    <RangePicker
      className='date-picker-common'
      onChange={onChange}
      format='YYYY-MM-DD'
    />
  );
};

export default memo(RangePickerCommon);
