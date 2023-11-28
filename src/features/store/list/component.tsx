import { type FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';

import { type IFilter } from './types';
import View from './view';

interface ListStoreComponentProps {
  api: IApiRequest;
}

const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListStoreComponent: FunctionComponent<ListStoreComponentProps> = props => {
  const { api } = props;
  const navigate = useNavigate();
  const { status } = useContext(ContextModal);

  const onClickRedirect = (url: string) => {
    navigate(url);
  };

  return (
    <View
      key={status}
      onClickRedirect={onClickRedirect}
      apiList={api}
      payload={payload}
    />
  );
};

export default ListStoreComponent;
