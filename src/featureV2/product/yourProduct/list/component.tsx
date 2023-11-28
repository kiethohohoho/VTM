import { useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { type IFilter } from '@/core2/table/request';
import { From, Limit, OrderBy } from '@/utils/Enums';

import { ViewProduct } from './view';

interface IComponentProduct {
  api: IApiRequest;
}
const payload: IFilter = {
  order: 'goodsId',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ComponentProduct = (props: IComponentProduct) => {
  const { api } = props;
  const { status } = useContext(ContextModal);
  return (
    <ViewProduct
      key={status}
      apiList={api}
      payload={payload}
    />
  );
};

export { ComponentProduct };
