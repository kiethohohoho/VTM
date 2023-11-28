import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import RegisterComponent from './component';
const config = new Config().getState();
const Index = () => {
  const auth = AuthService.getPackageAuth();
  const apiRegister: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.kyc.register,
    headers: {},
  };
  const apiUpload: IApiRequest = {
    method: 'put',
    // url: config.api.userPortal.upload,
    url: '/portalUser/upload',
    host: 'https://api.dev.locstoc.com',
    headers: {
      token: auth?.token,
      'Content-Type': 'application/application/x-www-form-urlencoded',
    },
  };
  return (
    <RegisterComponent
      apiRegister={apiRegister}
      apiUpload={apiUpload}
    />
  );
};
export default Index;
