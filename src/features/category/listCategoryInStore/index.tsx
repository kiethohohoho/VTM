import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListCategoryO2OComponent from './component';

const config = new Config().getState();

const IndexListCategoryO2O = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.category.categoryInStore._,
    headers: {
      token: auth?.token,
    },
  };
  return <ListCategoryO2OComponent api={list} />;
};
export default IndexListCategoryO2O;
