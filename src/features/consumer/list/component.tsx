import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { getListStore } from '@/features/common/getListStore';
import { From, Limit, OrderBy } from '@/utils/Enums';

import { type IFilter } from './interface';
import View from './view';

interface ListConsumerComponentProps {
  api: IApiRequest;
}
const payload: IFilter = {
  order: 'registrationDate',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ListConsumerComponent: FunctionComponent<ListConsumerComponentProps> = props => {
  const { api } = props;
  const { status } = useContext(ContextModal);
  const { isLoading, listStore } = getListStore();

  return (
    <View
      listStore={listStore}
      key={status}
      apiList={api}
      payload={payload}
      isLoading={isLoading}
    />
  );
};

export default ListConsumerComponent;
