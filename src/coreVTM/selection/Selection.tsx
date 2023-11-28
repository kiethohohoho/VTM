/* eslint-disable react/display-name */
import { FilterOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';

import { ButtonRoot } from '@/core2/button';
import { styleInputSelect } from '@/featureVTM/type';

import InputAntd from '../inputAntd/InputAntd';
import { type SelectionCommonProps } from './type';

const { Option } = Select;
export const OPTION_ADD_NEW = 'OPTION_ADD_NEW';
export const SELECT_MODE = {
  MULTIPLE: 'multiple',
};

// eslint-disable-next-line react/display-name
export const SelectionCommon = forwardRef<any, SelectionCommonProps>(
  (
    {
      disable,
      onChange,
      onClear,
      options,
      label,
      defaultValue,
      value,
      required,
      allowClear,
      mode,
      placeholder,
      filterOption,
      onSearch,
      keyLabel = 'key',
      valueLabel = 'value',
      style,

      onAddNew,
      hasAddNewOption,
      placeholderOptionAdd,
    },
    ref,
  ) => {
    const selectRef = useRef<any>(null);
    // const [language] = useContext(LanguageContext);
    const [newOption, setNewOption] = useState<string>('');

    useImperativeHandle(ref, () => ({
      focus: () => {
        selectRef.current?.focus();
      },
    }));

    const handleAddNew = () => {
      const trimmedValue = newOption.trim();
      if (!trimmedValue) {
        // showMessageError(SETTING_LANGUAGE[language].MESSAGE.REQUIRED_VALUE);
        return <p>error</p>;
      } else {
        const isDuplicate = !!options.find(item => item[keyLabel].toString() === trimmedValue);
        onAddNew(!isDuplicate ? trimmedValue : '');
        setNewOption('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        handleAddNew();
      }
    };

    return (
      <div className='select-common'>
        {label && <div className={`label u-title ${required ? 'required' : ''}`}>{label}</div>}
        <Select
          style={{ ...styleInputSelect, ...style }}
          disabled={disable}
          defaultValue={defaultValue}
          value={value}
          allowClear={allowClear}
          mode={mode as any}
          ref={selectRef}
          className='select'
          filterOption={filterOption}
          placeholder={placeholder}
          onSearch={onSearch}
          onChange={onChange}
          onClear={onClear}
          popupClassName={classNames('dropdown-select-common', {
            'enable-add': hasAddNewOption && onAddNew,
          })}
          dropdownRender={menu => (
            <>
              {menu}
              {hasAddNewOption && onAddNew && (
                <div className='new-option-wrap'>
                  <InputAntd
                    onChange={(value: any) => {
                      setNewOption(value);
                    }}
                    size='small'
                    value={newOption}
                    placeholder={placeholderOptionAdd}
                    onKeyDown={handleKeyDown}
                  />
                  <ButtonRoot
                    // shape='circle'
                    // type='white'
                    // icon={<PlusOutlined />}
                    text='select'
                    onClick={handleAddNew}
                  />
                </div>
              )}
            </>
          )}>
          {options && options.map(item => <Option key={item[keyLabel]}>{item[valueLabel]}</Option>)}
        </Select>
      </div>
    );
  },
);

interface FilterSelectionCommonProps extends SelectionCommonProps {}

export const FilterSelectionCommon = memo(
  ({ mode, onChange, options = [], label, defaultValue, value, keyLabel, valueLabel }: FilterSelectionCommonProps) => {
    return (
      <div className='filter-select-common'>
        <SelectionCommon
          mode={mode}
          onChange={onChange}
          options={options}
          label={label}
          defaultValue={defaultValue}
          value={value}
          keyLabel={keyLabel}
          valueLabel={valueLabel}
          onClear={function (): void {
            throw new Error('Function not implemented.');
          }}
          required={false}
          allowClear={false}
        />
        <div className='icon'>
          <FilterOutlined />
        </div>
      </div>
    );
  },
);
