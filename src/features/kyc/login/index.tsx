import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import LoginComponent from './component';

const config = new Config().getState();

export const apiLogin: IApiRequest = {
  method: 'post',
  url: config.api.lsUser.kyc.login,
  headers: {},
};

const Index = () => {
  return <LoginComponent />;
};
export default Index;
