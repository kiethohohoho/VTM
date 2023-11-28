import '@/assets/scss2/theme/_inputcommon.scss';

import { Input } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { type CustomInputProps, type CustomInputRef } from './type';

// eslint-disable-next-line react/display-name
const InputAntd = forwardRef<CustomInputRef, CustomInputProps>(
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
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<any>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.input.value = defaultValue || '';
      }
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.input?.focus();
        }
      },
      getValue: () => {
        if (inputRef.current && inputRef.current.input) {
          return inputRef.current.input.value;
        }
        return '';
      },
    }));

    const handleChange = (e: any) => {
      if (onChange) {
        onChange && onChange(e.target.value);
      }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (onEnter) {
        onEnter(e.currentTarget.value);
      }
    };

    return (
      <div className={`input-common size-${size}`}>
        <Input
          ref={inputRef}
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
          {...props}
        />
      </div>
    );
  },
);

export default InputAntd;
