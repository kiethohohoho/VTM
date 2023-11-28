import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import CreateConsumerWarehouse from './component';

const config = new Config().getState();
const IndexCreateWarehouse = () => {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.warehouse._,
    headers: {
      token: auth?.token,
    },
  };

  return <CreateConsumerWarehouse api={api} />;
};
export default IndexCreateWarehouse;
