import { DropDownList, type ListItemProps } from '@progress/kendo-react-dropdowns';
import { Field } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import React from 'react';

import { Localize, LocalizeTypeFunc } from '@/context/languages';

import ErrorHelperText from '../helperText';
import { type IDropDownComponent, type IDropDownRoot } from './type';

const DropDownComponent: React.FC<IDropDownComponent> = ({
  name,
  label,
  touched,
  typeColor = 'primary',
  value,
  className,
  validationMessage,
  ...rest
}) => {
  const checkError = Boolean(touched && validationMessage);
  const typeInput = checkError ? 'danger' : typeColor;

  const itemRender = (li: React.ReactElement<HTMLLIElement>, { dataItem, selected }: ListItemProps) => {
    const itemChildren = (
      <span
        className={`p-2 py-4 w-full text-neutral-100 bg-${selected && 'primary'}-focus-lv2 text-white`}
        style={{
          color: selected ? 'white' : 'black',
        }}>
        <Localize tid={dataItem.text} />
      </span>
    );
    li.props.style.padding = '0px';

    return React.cloneElement(li, li.props, itemChildren);
  };

  return (
    <div className='flex flex-column w-full'>
      <Label
        editorValid={!checkError}
        className={`text-lg ${!checkError ? 'text-neutral-100' : 'text-danger'} pb-1`}>
        <Localize tid={label || ''} />
      </Label>
      <DropDownList
        itemRender={itemRender}
        name={name}
        value={value}
        className={`
         border 
         border-solid 
         bg-white
         border-${typeInput}-300 
         hover:border-${typeInput}-hover 
         hover:bg-${typeInput}-bg-color 
         focus-within:border-${typeInput}-focus-lv1
         focus-within:shadow-${typeInput}
         ${className}
         `}
        textField='text'
        dataItemKey='id'
        {...rest}
      />
      {checkError && (
        <ErrorHelperText
          isError={checkError}
          typeColor={typeInput}
          errorMessage={validationMessage}
        />
      )}
    </div>
  );
};

const DropDownRoot: React.FC<IDropDownRoot> = ({ isForm, name, data, ...rest }) => {
  const dataConvertLabel = data?.map(item => {
    return {
      id: item.id,
      text: LocalizeTypeFunc(item.text),
    };
  });

  if (isForm) {
    return (
      <Field
        data={dataConvertLabel}
        name={name}
        component={DropDownComponent}
        {...rest}
      />
    );
  }
  return (
    <DropDownComponent
      name={name}
      data={dataConvertLabel}
      {...rest}
    />
  );
};

export default DropDownRoot;
