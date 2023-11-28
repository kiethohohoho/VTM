// import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React, { useEffect } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { TypeDashboardSale } from '@/utils/Enums';

import ViewDashboard from './view';

interface IComponentDashboard {
  apiSale: IApiRequest;
}

interface IStateDashboard {
  sale: {
    payload: {
      type: TypeDashboardSale;
      start: number;
      end: number;
    };
    data: [];
  };
}

const initialStateDashboard: IStateDashboard = {
  sale: {
    data: [],
    payload: {
      type: TypeDashboardSale.getByDate,
      start: 0,
      end: 0,
    },
  },
};

const ComponentDashboard: React.FC<IComponentDashboard> = ({ apiSale }) => {
  const [state, setState] = React.useState(initialStateDashboard);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        /* empty */
      } catch (error: any) {}
    },
    handleRequestError: () => {
      try {
        /* empty */
      } catch (error: any) {}
    },
  };

  useRequest(apiSale, funcRequest);

  const handleGetTypeSale = (id: TypeDashboardSale) => {
    setState(prev => {
      return {
        ...prev,
        sale: {
          ...prev.sale,
          payload: {
            ...prev.sale.payload,
            type: id,
          },
        },
      };
    });
  };

  useEffect(() => {
    // mutate({});
  }, []);

  return (
    <ViewDashboard
      saleActive={state.sale.payload.type}
      onGetTypeSale={handleGetTypeSale}
    />
  );
};

export default ComponentDashboard;
