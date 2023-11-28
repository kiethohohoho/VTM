import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailConsumerComponent from './component';

const config = new Config().getState();

const IndexDetailConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.warehouse._,
    headers: {
      token: auth?.token,
    },
  };
  return <DetailConsumerComponent api={api} />;
};
export default IndexDetailConsumer;
