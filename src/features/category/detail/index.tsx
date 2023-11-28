import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailCategoryComponent from './component';

const config = new Config().getState();

const IndexDetailCategory = () => {
  const auth = AuthService.getPackageAuth();

  const apiDetailInStore: IApiRequest = {
    method: 'get',
    url: config.api.lsProduct.category.categoryInStore._,
    headers: {
      token: auth?.token,
    },
  };
  const apiListProductInStore: IApiRequest = {
    method: 'get',
    url: config.api.lsProduct.category.categoryInStore.product,
    headers: {
      token: auth?.token,
    },
  };
  const apiListProductO2O: IApiRequest = {
    method: 'put',
    url: config.api.lsProduct.category.categoryO2o._,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <DetailCategoryComponent
      apiDetailInStore={apiDetailInStore}
      apiListProductInStore={apiListProductInStore}
      apiListProductO2O={apiListProductO2O}
    />
  );
};
export default IndexDetailCategory;
