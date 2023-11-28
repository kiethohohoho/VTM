import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import ForgotPasswordComponent from './component';

const config = new Config().getState();

export const requestForgotPassword: IApiRequest = {
  method: 'get',
  url: config.api.lsUser.kyc.forgot._,
  headers: {},
};
export const newForgotPassword: IApiRequest = {
  method: 'post',
  url: config.api.lsUser.kyc.forgot._,
  headers: {},
};

export const submitOtpForgotPassword: IApiRequest = {
  method: 'put',
  url: config.api.lsUser.kyc.otp,
  headers: {},
};

export const reSendOtpForgotPassword: IApiRequest = {
  method: 'delete',
  url: config.api.lsUser.kyc.otp,
  headers: {},
};

export const requestForgotEmailPassword: IApiRequest = {
  method: 'get',
  url: config.api.lsUser.kyc.forgot.email,
  headers: {},
};

const Index = () => {
  return <ForgotPasswordComponent />;
};
export default Index;
