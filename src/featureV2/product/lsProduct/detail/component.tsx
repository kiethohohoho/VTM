import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';

import { ViewDetailProduct } from './view';

interface IComponentDetailProduct {
  api: IApiRequest;
}
const ComponentDetailProduct: FunctionComponent<IComponentDetailProduct> = props => {
  const { api } = props;
  const { status } = useContext(ContextModal);

  return (
    <ViewDetailProduct
      key={status}
      apiList={api}
    />
  );
};

export { ComponentDetailProduct };
