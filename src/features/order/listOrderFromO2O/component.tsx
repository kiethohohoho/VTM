import { type DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { type FunctionComponent, useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { getListStore } from '@/features/common/getListStore';
import { OrderBy, type STATUS_ORDER } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IOrderItem } from './interface';
import View from './view';

interface ListOrderO2OComponentProps {
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
const initState: ListOrderO2OState = {
  payload: {
    storeId: '',
    queryRequest: {
      order: 'orderDate',
      by: OrderBy.DESC,
    },
  },
  orderList: [],
  isLoading: true,
  key: Helper.randomKey(),
};

const ListOrderO2OComponent: FunctionComponent<ListOrderO2OComponentProps> = props => {
  const { api } = props;
  const { isLoading: loadingStore, listStore } = getListStore();
  const [state, setState] = useState<ListOrderO2OState>(initState);

  useEffect(() => {
    if (listStore.length > 0) {
      const { payload } = state;
      payload.storeId = listStore[0].id as string;
      setState(s => ({ ...s, payload }));
      mutate(payload);
    }
  }, [listStore.length]);

  const funcRequestListOrderO2O = {
    handleRequestSuccess: (data: { list: IOrderItem[] }) => {
      let { orderList } = state;
      orderList = data.list;
      setState(s => ({ ...s, orderList }));
    },
  };
  const { isLoading, mutate } = useRequest(api, funcRequestListOrderO2O);

  const handleChangeDate = (e: DateRangePickerChangeEvent) => {
    if (e.value.start && e.value.end) {
      const { payload } = state;
      payload.queryRequest.fieldDate = 'orderGroup.orderDate';
      payload.queryRequest.fromDate = new Date(e.value.start).getTime();
      payload.queryRequest.toDate = new Date(e.value.end).getTime();
      setState(s => ({ ...s, payload }));
    }
  };

  const handleResetOrder = () => {
    let { payload, key } = state;
    payload.storeId = listStore[0].id as string;
    payload.queryRequest = {
      order: 'orderDate',
      by: OrderBy.DESC,
    };
    key = Helper.randomKey();
    setState(s => ({ ...s, payload, key }));
    mutate(payload);
  };
  const handleSubmitSearch = (data: Record<string, any>) => {
    const { payload } = state;
    payload.storeId = data.store?.id || (listStore[0]?.id as string);
    payload.queryRequest.filter = data.filterValue?.id && data.filterValue?.id !== 'all' ? 'order.status' : undefined;
    payload.queryRequest.filterValue =
      data.filterValue?.id !== 'all' && data.filterValue?.id ? data.filterValue?.id : undefined;
    setState(s => ({ ...s, payload }));
    mutate(payload);
  };
  const handleUpdateSuccess = () => {
    const { payload } = state;
    mutate(payload);
  };
  return (
    <View
      key={state.key}
      state={state}
      listStore={listStore}
      isLoading={isLoading || loadingStore}
      handleSubmitSearch={handleSubmitSearch}
      handleResetOrder={handleResetOrder}
      handleChangeDate={handleChangeDate}
      handleUpdateSuccess={handleUpdateSuccess}
    />
  );
};

export default ListOrderO2OComponent;
