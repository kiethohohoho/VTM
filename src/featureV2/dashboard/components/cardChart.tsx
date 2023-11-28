import { type ActiveView, type DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React from 'react';

import { CardForm } from '@/core2/card';
import DateRangePickerCore from '@/core2/dateRangePicker';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { TypeDashboardSale } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

interface ICardIChart {
  description?: string;
  title?: string;
  type: TypeDashboardSale;
  onChange: (event: DropDownListChangeEvent) => void;
  onChangeDate: (e: DateRangePickerChangeEvent) => void;
  date: {
    start: any;
    end: any;
  };
}

const dataTypeDropdown: IItemDataDropDown[] = [
  {
    id: TypeDashboardSale.getByDate,
    text: 'By date',
  },
  {
    id: TypeDashboardSale.getByMonth,
    text: 'By month',
  },
  {
    id: TypeDashboardSale.getByYear,
    text: 'By year',
  },
];

const bottomView: Record<TypeDashboardSale, ActiveView> = {
  [TypeDashboardSale.getByDate]: 'month',
  [TypeDashboardSale.getByMonth]: 'year',
  [TypeDashboardSale.getByYear]: 'decade',
};

const CardChart: React.FC<ICardIChart> = ({
  children,
  description = 'Last 7 days',
  title = 'Sale',
  onChange,
  onChangeDate,
  date = {
    start: new Date(),
    end: null,
  },
  type,
}) => {
  return (
    <CardForm>
      <div>
        <div className='flex justify-between items-center'>
          <div className='text-3xl text-bold'>{title}</div>
          <div className='flex flex-column gap-3 '>
            <div className='flex gap-3 xl:flex-column'>
              <div className='flex items-end'>
                <DateRangePickerCore
                  calendarSettings={{
                    bottomView: bottomView[type],
                    views: type === TypeDashboardSale.getByDate ? 2 : 1,
                  }}
                  onChange={onChangeDate}
                  labelStart=''
                  labelEnd=''
                  defaultValue={{
                    start: Helper.convertToDate(date.start),
                    end: Helper.convertToDate(date.end),
                  }}
                />
              </div>
              <div className='w-40'>
                <DropDownRoot
                  defaultValue={dataTypeDropdown.find(item => item.id === type)}
                  onChange={onChange}
                  name='type'
                  data={dataTypeDropdown}
                />
              </div>
            </div>
            <span className='text-xs text-neutral-60'>{description}</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </CardForm>
  );
};

export default CardChart;
