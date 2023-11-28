import { type IApiRequest } from '@/api/api.interface';
import DeviceService from '@/utils/Device';
import { Helper } from '@/utils/Helper';

import { type VIEW_LOGIN } from '../login.interface';
/* eslint-disable */
// import Config from '@/Config';
import LoginComponent from './component';
import createSocketID, { createChecking } from './socket';
// const config = new Config().getState();
const DevideInfo = DeviceService.getDeviceInfo();
const BrowserId = Helper.getBrowserId();
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
    'checking': createChecking(),
    'session-token':createSocketID(),
  },
};
export interface IIndexLoginVTM {
    handleGetResponseSuccess: any;
    responseSuccess: any;
    handleBack?: (step: VIEW_LOGIN) => void;
    loading?: boolean;
  }
  
const IndexLogin = ({ handleGetResponseSuccess, responseSuccess }: IIndexLoginVTM) => {
  return <LoginComponent handleGetResponseSuccess={handleGetResponseSuccess}
  responseSuccess={responseSuccess} />;
};

export default IndexLogin;
