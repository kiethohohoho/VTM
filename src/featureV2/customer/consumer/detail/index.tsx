import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentDetailConsumer } from './component';

const config = new Config().getState();

const IndexDetailConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentDetailConsumer api={api} />;
};
export default IndexDetailConsumer;
