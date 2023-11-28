import { Radio } from 'antd';
import React, { memo } from 'react';

import { type RadioCommonProps } from './type';

// eslint-disable-next-line react/display-name
const RadioAntd: React.FC<RadioCommonProps> = memo(({ value, onChange, options, className }) => {
  const handleRadioChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      onChange={handleRadioChange}
      value={value}
      className={className}>
      {options.map(item => (
        <Radio
          key={item.value}
          value={item.value}
          disabled={item.disabled}>
          {item.content}
        </Radio>
      ))}
    </Radio.Group>
  );
});

export default RadioAntd;
