import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import CreateCategoryComponent from './component';

const config = new Config().getState();

const IndexCreateCategory = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.category.categoryInStore._,
    headers: {
      token: auth?.token,
    },
  };
  return <CreateCategoryComponent api={api} />;
};
export default IndexCreateCategory;
