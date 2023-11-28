import { Field } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import React from 'react';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import ErrorHelperText from '@/core2/helperText';

import { type IInputRoot, type IInputRootComponent } from './types';

export const InputRootComponent: React.FC<IInputRootComponent> = ({
  label,
  validationMessage,
  touched,
  typeColor = 'primary',
  placeholder,
  className,
  labelClassName,
  ...other
}) => {
  const checkError = Boolean(touched && validationMessage);
  const typeInput = checkError ? 'danger' : typeColor;

  return (
    <div className='flex flex-column w-full'>
      <Label
        editorValid={!checkError}
        className={`text-lg ${!checkError ? 'text-neutral-100' : 'text-danger'} pb-1 ${labelClassName}`}>
        <Localize tid={label || ''} />
      </Label>
      <Input
        className={`
        border 
        border-solid 
        border-${typeInput}-300 
        hover:border-${typeInput}-hover 
        hover:bg-${typeInput}-bg-color 
        focus:border-${typeInput}-focus-lv1
        focus:shadow-${typeInput}
        ${className}
        `}
        placeholder={LocalizeTypeFunc(placeholder || '')}
        {...other}
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

const InputRoot: React.FC<IInputRoot> = ({ isForm = true, name, ...other }) => {
  if (isForm) {
    return (
      <Field
        name={name}
        {...other}
        component={InputRootComponent}
      />
    );
  }
  return (
    <InputRootComponent
      name={name}
      {...other}
    />
  );
};

export default InputRoot;
