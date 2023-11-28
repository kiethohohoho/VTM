import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DialogUpdateStaffComponent from './component';

const config = new Config().getState();

const DialogUpdateStaffIndex = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.staff._,
    headers: {
      token: auth?.token,
    },
  };
  return <DialogUpdateStaffComponent api={api} />;
};
export default DialogUpdateStaffIndex;
