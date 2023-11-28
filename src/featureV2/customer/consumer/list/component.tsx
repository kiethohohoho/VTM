import { useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { type IFilter } from '@/core2/table/request';
import { From, Limit, OrderBy } from '@/utils/Enums';

import { ViewListConsumer } from './view';

interface IComponentListConsumer {
  api: IApiRequest;
}
const payload: IFilter = {
  order: 'registrationDate',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ComponentListConsumer = (props: IComponentListConsumer) => {
  const { api } = props;
  const { status } = useContext(ContextModal);
  return (
    <ViewListConsumer
      key={status}
      apiList={api}
      payload={payload}
    />
  );
};

export { ComponentListConsumer };
