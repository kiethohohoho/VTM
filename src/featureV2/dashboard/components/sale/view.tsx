import 'hammerjs';

import {
  Chart,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
} from '@progress/kendo-react-charts';
import { type DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React from 'react';

import { TypeDashboardSale } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import CardChart from '../cardChart';

interface IViewDashBoardSale {
  onGetTypeSale: (event: DropDownListChangeEvent) => void;
  type: any;
  date: {
    start: any;
    end: any;
  };
  data: Array<{
    date: number;
    totalAmountOffline: string;
    totalAmountOnline: string;
  }>;
  onChangeDate: (e: DateRangePickerChangeEvent) => void;
}

const ViewDashBoardSale: React.FC<IViewDashBoardSale> = ({ onGetTypeSale, type, data, ...other }) => {
  const horizontalData = data.map(item => {
    switch (type) {
      case TypeDashboardSale.getByMonth:
        return Helper.convertMillisecondToMonth(item.date);
      case TypeDashboardSale.getByYear:
        return Helper.convertMillisecondToYear(item.date);
      default:
        return Helper.convertMillisecondToDay(item.date);
    }
  });
  const verticalDataOffline = data.map(item => item.totalAmountOffline);
  const verticalDataOnline = data.map(item => item.totalAmountOnline);
  return (
    <CardChart
      {...other}
      type={type}
      onChange={onGetTypeSale}
      title='Sale'
      description=''>
      <div className='grid grid-cols-2 xl:grid-cols-1 gap-10'>
        <Chart>
          <ChartTitle text='Offline' />
          <ChartLegend
            position='top'
            orientation='horizontal'
          />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={horizontalData} />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem
              type='line'
              data={verticalDataOffline}
              tooltip={{
                visible: true,
              }}
              markers={{
                visible: false,
              }}
              style={'smooth'}
              color={'#002660'}
            />
          </ChartSeries>
        </Chart>
        <Chart>
          <ChartTitle text='Online' />
          <ChartLegend
            position='top'
            orientation='horizontal'
          />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={horizontalData} />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem
              type='line'
              data={verticalDataOnline}
              tooltip={{
                visible: true,
              }}
              markers={{
                visible: false,
              }}
              style={'smooth'}
              color={'#006c58'}
            />
          </ChartSeries>
        </Chart>
      </div>
    </CardChart>
  );
};
export default ViewDashBoardSale;
