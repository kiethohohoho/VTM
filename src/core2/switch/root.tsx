import './_index.scss';

import { Field } from '@progress/kendo-react-form';
import { Switch, type SwitchChangeEvent, type SwitchProps } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';

export enum ETypeSwitchRoot {
  ROOT = 1,
  FORM,
}

export interface ISwitchRoot extends SwitchProps {
  label?: string | React.ReactNode;
  color?: 'primary' | 'secondary' | 'info';
  isForm?: boolean;
}

function SwitchComponent({
  name,
  className,
  defaultChecked,
  label,
  color = 'primary',
  onLabel = '',
  offLabel = '',
  size = 'small',
  onChange,
  ...rest
}: ISwitchRoot) {
  /* hook */
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (defaultChecked) {
      setChecked(defaultChecked);
    }
  }, [defaultChecked]);
  /* handle */
  const handleGetValue = (event: SwitchChangeEvent) => {
    setChecked(event.value);
  };
  return (
    <div className={`ls-flex ls-items_center ${label ? 'ls-gap_2' : ''}`}>
      <span>{label}</span>
      <Switch
        name={name}
        onChange={(event: SwitchChangeEvent) => {
          handleGetValue(event);
          onChange && onChange(event);
        }}
        checked={checked}
        size={size}
        onLabel={onLabel}
        offLabel={offLabel}
        className={`ls-switchRoot_size-${size} ls-switchRoot_bg-${checked && color} ${className}`}
        defaultChecked={defaultChecked}
        {...rest}
      />
    </div>
  );
}

function SwitchRoot({ isForm, name = 'root', ...rest }: ISwitchRoot) {
  if (isForm) {
    return (
      <Field
        name={name}
        component={SwitchComponent}
        {...rest}
      />
    );
  }
  return (
    <SwitchComponent
      name={name}
      {...rest}
    />
  );
}
export default SwitchRoot;
