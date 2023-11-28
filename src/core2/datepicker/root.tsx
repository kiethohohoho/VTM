import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Field } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';

import { Localize } from '@/context/languages';

import ErrorHelperText from '../helperText';
import { type IDatePickerComponent, type IDatePickerRoot } from './types';

const DatePickerComponent = ({
  name,
  id,
  size = 'medium',
  label,
  touched,
  validationMessage,
  typeColor,
  ...rest
}: IDatePickerComponent) => {
  const checkError = Boolean(touched && validationMessage);
  const typeInput = checkError ? 'danger' : typeColor;

  return (
    <div className='flex flex-column w-full'>
      <Label
        editorValid={!checkError}
        className={`text-lg ${!checkError ? 'text-neutral-100' : 'text-danger'} pb-1`}>
        <Localize tid={label || ''} />
      </Label>
      <DatePicker
        className={`
         border 
         border-solid 
         border-${typeInput}-300 
         hover:border-${typeInput}-hover 
         hover:bg-${typeInput}-bg-color 
         focus-within:border-${typeInput}-focus-lv1
         focus-within:shadow-${typeInput}
         `}
        name={name}
        id={id}
        {...rest}
        placeholder='Choose a date...'
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

const DatePickerRoot = ({ name, isForm, ...rest }: IDatePickerRoot) => {
  if (isForm) {
    return (
      <Field
        name={name}
        component={DatePickerComponent}
        {...rest}
      />
    );
  }
  return (
    <DatePickerComponent
      name={name}
      {...rest}
    />
  );
};

export default DatePickerRoot;
