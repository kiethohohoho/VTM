import { Field } from '@progress/kendo-react-form';
import { RadioGroup } from '@progress/kendo-react-inputs';

import { LocalizeTypeFunc } from '@/context/languages';

import { type IDataRadioRoot, type IRadioGroupComponent, type IRadioGroupRoot } from './types';
const RadioComponent = ({ name, layout, disabled, ...rest }: IRadioGroupComponent) => {
  return (
    <RadioGroup
      name={name}
      disabled={disabled}
      layout={layout}
      {...rest}
    />
  );
};

const RadioGroupRoot = ({ isForm, id, name, data, ...rest }: IRadioGroupRoot) => {
  const localizeForLabelData: IDataRadioRoot[] = data.map(item => {
    return {
      label: LocalizeTypeFunc(item.label),
      value: item.value,
    };
  });
  if (isForm) {
    return (
      <Field
        data={localizeForLabelData}
        name={name}
        component={RadioComponent}
        {...rest}
      />
    );
  }
  return (
    <RadioComponent
      data={localizeForLabelData}
      id={id}
      name={name}
      {...rest}
    />
  );
};

export default RadioGroupRoot;
