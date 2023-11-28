import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ProductDictionaryListComponent from './component';

const config = new Config().getState();

const ProductDictionaryListIndex = () => {
  const auth = AuthService.getPackageAuth();

  const list: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.productDictionary,
    headers: {
      token: auth?.token,
    },
  };
  return <ProductDictionaryListComponent api={list} />;
};
export default ProductDictionaryListIndex;
