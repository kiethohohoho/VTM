import { DateInput, type DateInputProps } from '@progress/kendo-react-dateinputs';
import { Label } from '@progress/kendo-react-labels';

import { Localize } from '@/context/languages';
interface IDatePickerRoot extends DateInputProps {
  isFormElement: boolean;
  name: string;
}
interface IDatePickerComponent extends Omit<IDatePickerRoot, 'isFormElement'> {}
const CustomEndDateInput = ({ name, id, size = 'medium', label, ...rest }: IDatePickerComponent) => {
  return (
    <div className='flex flex-column gap-1 '>
      {label && (
        <Label>
          <Localize tid={label} />
        </Label>
      )}
      <DateInput
        format={'dd/MM/yyyy'}
        className={`ls-datePicker_size-${size}`}
        name={name}
        id={id}
        {...rest}
        placeholder='Choose a date...'
      />
    </div>
  );
};
export default CustomEndDateInput;
