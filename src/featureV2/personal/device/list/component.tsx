import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';

import { type IFilter } from './interface';
import { ViewListDevice } from './view';

interface IComponentListDevice {
  api: IApiRequest;
}
const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ComponentListDevice: FunctionComponent<IComponentListDevice> = props => {
  const { api } = props;
  const { status } = useContext(ContextModal);

  return (
    <ViewListDevice
      key={status}
      apiList={api}
      payload={payload}
    />
  );
};

export { ComponentListDevice };
