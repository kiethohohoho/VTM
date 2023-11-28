import { type IApiRequest } from '@/api/api.interface';
import AuthService from '@/utils/Auth';
import DeviceService from '@/utils/Device';
import { Helper } from '@/utils/Helper';

/* eslint-disable */
// import Config from '@/Config';
import LoginComponent from './component';
import createSocketID from './loginForm/socket';
// const config = new Config().getState();
const DevideInfo = DeviceService.getDeviceInfo();
const BrowserId = Helper.getBrowserId();
const auth = AuthService.getPackageAuth();
export const apiLogin: IApiRequest = {
  method: 'post',
  // url: config.api.vtmUser.kyc.login,
  url: 'https://api-vtm.intelin.vn/auth/login',
  // headers: {},
  headers: {
    'Content-Type': "application/json",
    'device-info': DevideInfo,
    'app-version': '1.0.2c:Web',
    'device-id': "",
    'browser-id': BrowserId,
    'checking': createSocketID(),
    'session-token':createSocketID(),
  },
};

console.log('dqwdqqwqwdqwdq',auth)

const Index = () => {
  return <LoginComponent />;
};

export default Index;
