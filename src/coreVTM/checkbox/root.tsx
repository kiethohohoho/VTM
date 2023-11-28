import { Checkbox } from 'antd';
import { type CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useState } from 'react';

interface CheckboxRootAntDProps {
  content?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  value?: any;
  isGroup?: boolean;
}

const CheckboxRootAntD: React.FC<CheckboxRootAntDProps> = ({
  isGroup,
  content,
  checked,
  onChange,
  value,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (e: CheckboxChangeEvent) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };
  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      value={value}
      {...props}>
      {content}
    </Checkbox>
  );
};

export default CheckboxRootAntD;
