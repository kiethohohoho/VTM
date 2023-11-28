import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListConsumerComponent from './component';

const config = new Config().getState();

const IndexListConsumer = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.device,
    headers: {
      token: auth?.token,
    },
  };
  return <ListConsumerComponent api={list} />;
};
export default IndexListConsumer;
