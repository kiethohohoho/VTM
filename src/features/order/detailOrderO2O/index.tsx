import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailConsumerDevice from './component';

const config = new Config().getState();

const IndexDetailOrderO2O = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsOrder.o2oOrderManagement,
    headers: {
      token: auth?.token,
    },
  };
  return <DetailConsumerDevice api={api} />;
};
export default IndexDetailOrderO2O;
