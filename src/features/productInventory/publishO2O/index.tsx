import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListProductToO2OComponent from './component';

const config = new Config().getState();

const ListProductToO2OIndex = () => {
  const auth = AuthService.getPackageAuth();

  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.product,
    headers: {
      token: auth?.token,
    },
  };
  return <ListProductToO2OComponent api={list} />;
};
export default ListProductToO2OIndex;
