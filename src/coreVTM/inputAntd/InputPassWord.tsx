/* eslint-disable react/display-name */
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { type CustomInputProps, type CustomInputRef } from './type';

const InputPassword = forwardRef<CustomInputRef, CustomInputProps>(
  (
    {
      onBlur,
      value,
      onChange,
      placeholder,
      type,
      defaultValue,
      prefix,
      suffix,
      autoFocus,
      disabled,
      allowClear,
      onKeyDown,
      onEnter,
      size,
      classNames,
      ...props
    },
    ref,
  ) => {
    const passWordRef = useRef<any>(null);

    useEffect(() => {
      if (passWordRef.current) {
        passWordRef.current.input.value = defaultValue || '';
      }
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (passWordRef.current) {
          passWordRef.current.input?.focus();
        }
      },
      getValue: () => {
        if (passWordRef.current && passWordRef.current.input) {
          return passWordRef.current.input.value;
        }
        return '';
      },
    }));

    const handleChange = (e: any) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onEnter) {
        onEnter(e.currentTarget.value);
      }
    };

    return (
      <div className={`input-common size-${size}`}>
        <Input.Password
          ref={passWordRef}
          autoFocus={autoFocus}
          onBlur={onBlur}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          type={type}
          prefix={prefix}
          suffix={suffix}
          onKeyDown={onKeyDown}
          disabled={disabled}
          allowClear={allowClear}
          size={size}
          onPressEnter={handleEnter}
          classNames={classNames}
          {...props}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>
    );
  },
);

export default InputPassword;
