import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { getListStore } from '@/features/common/getListStore';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';

import { type IFilter } from './interface';
import View from './view';

interface ListCategoryO2OComponentProps {
  api: IApiRequest;
}
const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListCategoryO2OComponent: FunctionComponent<ListCategoryO2OComponentProps> = props => {
  const { api } = props;
  const { status } = useContext(ContextModal);
  const { listStore } = getListStore();

  return (
    <View
      key={status}
      apiList={api}
      payload={payload}
      listStore={listStore}
    />
  );
};

export default ListCategoryO2OComponent;
