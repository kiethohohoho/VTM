import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';

import { type IFilter } from './interface';
import View from './view';

interface ListDeviceComponentProps {
  api: IApiRequest;
}
const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListDeviceComponent: FunctionComponent<ListDeviceComponentProps> = props => {
  const { api } = props;
  const { status } = useContext(ContextModal);

  return (
    <View
      key={status}
      apiList={api}
      payload={payload}
    />
  );
};

export default ListDeviceComponent;
