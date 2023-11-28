import { useQueryClient } from '@tanstack/react-query';
import { type FunctionComponent, useCallback, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { From, Limit, Order, OrderBy, QUERY_KEY } from '@/utils/Enums';

import { type IFilter } from './interface';
import View from './view';

interface ListOrderComponentProps {
  api: IApiRequest;
}
const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListOrderComponent: FunctionComponent<ListOrderComponentProps> = props => {
  const { api } = props;
  const { status, onSetView } = useContext(ContextModal);
  const queryClient = useQueryClient();
  const handleUpdateSuccess = useCallback(() => {
    queryClient.invalidateQueries([QUERY_KEY.ORDERS]);
  }, []);
  return (
    <View
      key={status}
      apiList={api}
      payload={payload}
      handleUpdate={onSetView}
      handleUpdateSuccess={handleUpdateSuccess}
    />
  );
};

export default ListOrderComponent;
