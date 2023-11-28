import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import UpdateConsumerComponent from './component';

const config = new Config().getState();

const IndexUpdateConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return <UpdateConsumerComponent api={api} />;
};
export default IndexUpdateConsumer;
