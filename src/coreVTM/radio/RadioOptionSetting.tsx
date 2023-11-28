import classNames from 'classnames';
import React from 'react';

interface RadioOptionSettingProps {
  icon?: React.ReactNode;
  value: any;
  checked?: boolean;
  label?: string;
  children?: React.ReactNode;
  isSelection?: boolean;
  onChange?: (value: any) => void;
}

const RadioOptionSetting: React.FC<RadioOptionSettingProps> = ({
  icon,
  value,
  checked,
  label,
  children,
  isSelection,
  onChange,
}) => {
  const handleSelect = () => {
    onChange && onChange(value);
  };

  return (
    <div
      className={classNames('radio-option-setting', {
        active: checked,
        select: isSelection,
      })}
      onClick={handleSelect}>
      {icon && <div className='icon'>{icon}</div>}
      <div
        className={classNames('option-item', {
          label: true,
          'has-icon': !!icon,
        })}>
        {label || children}
      </div>
    </div>
  );
};

export default RadioOptionSetting;
