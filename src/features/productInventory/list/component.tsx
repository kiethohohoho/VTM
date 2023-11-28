import { type FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { type IFilter } from './interface';
import View from './view';

interface ProductDictionaryListComponentProps {
  api: IApiRequest;
}

const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ProductDictionaryListComponent: FunctionComponent<ProductDictionaryListComponentProps> = props => {
  const { api } = props;
  const navigate = useNavigate();
  const { status } = useContext(ContextModal);
  const [storeId, setStoreId] = useState<string | number>();
  const onClickRedirect = (url: string) => {
    navigate(url);
  };

  const handleChangeStore = (storeId: string | number) => {
    try {
      LoggerService.info('ProductDictionaryListComponent execute handleChangeStore');
      setStoreId(storeId);
    } catch (error: any) {
      LoggerService.error('ProductDictionaryListComponent execute handleChangeStore error', error);
    }
  };
  return (
    <View
      key={status}
      onClickRedirect={onClickRedirect}
      apiList={api}
      payload={payload}
      storeId={storeId}
      handleChangeStore={handleChangeStore}
    />
  );
};

export default ProductDictionaryListComponent;
