import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentDetailOrder } from './component';

const config = new Config().getState();

const IndexDetailOrder = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsOrder.o2oOrderManagement,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentDetailOrder api={api} />;
};
export default IndexDetailOrder;
