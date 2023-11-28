import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentDetailProduct } from './component';

const config = new Config().getState();

const IndexDetailProduct = () => {
  const auth = AuthService.getPackageAuth();
  const params = useParams();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsProduct.sku,
    params: { productDictionaryId: params?.productDictionaryId, storeId: params?.storeId },
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentDetailProduct api={api} />;
};
export default IndexDetailProduct;
