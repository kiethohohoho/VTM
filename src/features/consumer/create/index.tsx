import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import CreateConsumerComponent from './component';

const config = new Config().getState();

const IndexCreateConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.consumer,
    headers: {
      token: auth?.token,
    },
  };

  return <CreateConsumerComponent api={api} />;
};
export default IndexCreateConsumer;
