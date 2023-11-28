import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentListDevice } from './component';

const config = new Config().getState();

const IndexListDevice = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.device,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentListDevice api={list} />;
};
export default IndexListDevice;
