import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentListOrder } from './component';

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

  return <ComponentListOrder api={list} />;
};
export default IndexListOrder;
