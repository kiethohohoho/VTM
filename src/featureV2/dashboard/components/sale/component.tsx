import { type DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { TypeDashboardSale } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import ViewDashBoardInventory from './view';

interface IPayloadDashboardSale {
  start: number;
  end: number;
  type: number;
}
interface IStateDashboardInventory {
  type: TypeDashboardSale;
  start: any;
  end: any;
  data: Array<{
    date: number;
    totalAmountOffline: string;
    totalAmountOnline: string;
  }>;
}
const initialStateDate: IStateDashboardInventory = {
  data: [],
  type: TypeDashboardSale.getByDate,
  start: dayjs().set('day', -5).unix() * 1000,
  end: dayjs().unix() * 1000,
};
const initialStateGetMonth: IStateDashboardInventory = {
  data: [],
  type: TypeDashboardSale.getByMonth,
  start: dayjs().set('month', 6).unix() * 1000,
  end: dayjs().unix() * 1000,
};
const initialStateGetYear: IStateDashboardInventory = {
  data: [],
  type: TypeDashboardSale.getByYear,
  start:
    dayjs()
      .set('day', -365 * 5)
      .unix() * 1000,
  end: dayjs().unix() * 1000,
};
interface IComponentDashboardInventory {
  apiSale: IApiRequest;
}

const ComponentDashboardInventory: React.FC<IComponentDashboardInventory> = ({ apiSale }) => {
  const [state, setState] = React.useState(initialStateDate);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        setState(prev => {
          return {
            ...prev,
            data,
          };
        });
      } catch (error: any) {}
    },
    handleRequestError: (error: any) => {
      try {
        LoggerService.error('ComponentDashboardInventory execute handleRequestError', error.toString());
      } catch (error: any) {}
    },
  };
  const { mutate } = useRequest(apiSale, funcRequest);

  const handleGetTypeSale = (event: DropDownListChangeEvent) => {
    switch (event.value.id) {
      case TypeDashboardSale.getByMonth:
        setState(initialStateGetMonth);
        break;
      case TypeDashboardSale.getByYear:
        setState(initialStateGetYear);
        break;
      default:
        setState(initialStateDate);
        break;
    }
    setState(prev => {
      return {
        ...prev,
        type: event.value.id,
      };
    });
  };
  const handleOnChangeDate = (e: DateRangePickerChangeEvent) => {
    setState(prev => {
      return {
        ...prev,
        start: Helper.convertDateToMillisecond(e.value.start),
        end: Helper.convertDateToMillisecond(e.value.end),
      };
    });
  };

  useEffect(() => {
    const payload: IPayloadDashboardSale = {
      end: state.end,
      start: state.start,
      type: state.type,
    };
    if (state.end && state.start) {
      mutate({ ...payload });
    }
    return () => {};
  }, [state.end, state.start, state.type]);

  return (
    <ViewDashBoardInventory
      onChangeDate={handleOnChangeDate}
      data={state.data}
      date={{
        end: state.end,
        start: state.start,
      }}
      type={state.type}
      onGetTypeSale={handleGetTypeSale}
    />
  );
};

export default ComponentDashboardInventory;
