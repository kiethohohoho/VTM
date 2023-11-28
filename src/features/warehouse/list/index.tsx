import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListWarehouseComponent from './component';

const config = new Config().getState();

const IndexListWarehouse = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.warehouse.list,
    headers: {
      token: auth?.token,
    },
  };
  return <ListWarehouseComponent api={list} />;
};
export default IndexListWarehouse;
