import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListConsumerComponent from './component';

const config = new Config().getState();

const IndexListConsumer = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return <ListConsumerComponent api={list} />;
};
export default IndexListConsumer;
