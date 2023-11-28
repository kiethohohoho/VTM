import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListGroupComponent from './component';

const config = new Config().getState();

const IndexListGroup = () => {
  const auth = AuthService.getPackageAuth();
  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.staff.groupStaff,
    headers: {
      token: auth?.token,
    },
  };
  return <ListGroupComponent api={list} />;
};
export default IndexListGroup;
