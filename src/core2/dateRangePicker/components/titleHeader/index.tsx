import { type CalendarHeaderTitleProps } from '@progress/kendo-react-dateinputs';
import React from 'react';

import { type IItemDataDropDown } from '@/core2/dropdown/type';

interface ITitleHeaderDateRangePicker extends CalendarHeaderTitleProps {
  fields: IItemDataDropDown[];
  fieldActive: any;
  onChange: (id: string) => void;
}

const TitleHeaderDateRangePicker: React.FC<ITitleHeaderDateRangePicker | undefined> = ({
  fields,
  fieldActive,
  onChange,
}) => {
  return (
    <div className='flex'>
      {fields.map((item, index) => {
        return (
          <div
            onClick={() => {
              onChange(item.id);
            }}
            className={`p-2 cursor-pointer rounded-lg ${fieldActive === item.id && 'bg-neutral-30'}`}
            key={TitleHeaderDateRangePicker.name + index.toString()}>
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default TitleHeaderDateRangePicker;
