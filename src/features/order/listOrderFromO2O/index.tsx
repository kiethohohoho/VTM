import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListOrderO2OComponent from './component';

const config = new Config().getState();

const IndexListOrder = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsOrder.o2oOrderManagement,
    headers: {
      token: auth?.token,
    },
  };

  return <ListOrderO2OComponent api={list} />;
};
export default IndexListOrder;
