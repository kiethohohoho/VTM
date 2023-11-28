import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailConsumerDevice from './component';

const config = new Config().getState();

const IndexDetailDevice = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.device,
    headers: {
      token: auth?.token,
    },
  };
  return <DetailConsumerDevice api={api} />;
};
export default IndexDetailDevice;
