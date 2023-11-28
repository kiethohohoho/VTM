import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListCategoryInStoreComponent from './component';

const config = new Config().getState();

const IndexListCategoryInStore = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.category.categoryInStore._,
    headers: {
      token: auth?.token,
    },
  };
  return <ListCategoryInStoreComponent api={list} />;
};
export default IndexListCategoryInStore;
