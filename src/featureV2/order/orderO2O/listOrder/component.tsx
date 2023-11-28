import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { type IFilter } from '@/core2/table/request';
import { From, Limit, OrderBy, OrderType, type STATUS_ORDER } from '@/utils/Enums';

import { type IOrderItem } from './interface';
import { ViewListOrder } from './view';

interface IComponentListOrder {
  api: IApiRequest;
}
export interface ListOrderO2OState {
  payload: {
    storeId: string;
    queryRequest: {
      order: string;
      by: OrderBy;
      filter?: string;
      filterValue?: STATUS_ORDER;
      fieldDate?: string;
      fromDate?: number;
      toDate?: number;
    };
  };
  orderList: IOrderItem[] | [];
  isLoading: boolean;
  key: string;
}

const payload: IFilter = {
  order: 'orderDate',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
  filter: 'orderGroup.orderType',
  filterValue: OrderType.orderOnline,
};

const ComponentListOrder: FunctionComponent<IComponentListOrder> = props => {
  const { api } = props;
  return (
    <ViewListOrder
      apiList={api}
      payload={payload}
    />
  );
};

export { ComponentListOrder };
