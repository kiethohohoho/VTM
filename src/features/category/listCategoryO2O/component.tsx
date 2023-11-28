import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { getListStore } from '@/features/common/getListStore';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';

import { type IFilter } from './interface';
import View from './view';

interface ListCategoryInStoreComponentProps {
  api: IApiRequest;
}
export interface ListCategoryInStoreComponentPayload {
  queryRequest: IFilter;
  storeId?: string;
}
const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListCategoryInStoreComponent: FunctionComponent<ListCategoryInStoreComponentProps> = props => {
  const { api } = props;
  const { listStore } = getListStore();
  return (
    <View
      apiList={api}
      payload={payload}
      listStore={listStore}
    />
  );
};

export default ListCategoryInStoreComponent;
