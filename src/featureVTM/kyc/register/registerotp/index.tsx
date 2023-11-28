import { type IApiRequest } from '@/api/api.interface';

import { type IIndexOfViewVTM } from '../type';
// import Config from '@/Config';
import RegisterOTPComponent from './component';
// const config = new Config().getState();

const IndexRegisterOTP = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewVTM) => {
  const apiHandleOTP: IApiRequest = {
    method: 'post',
    url: 'https://api-vtm.intelin.vn/public/otp',
    headers: {},
  };
  const apiResendOtp: IApiRequest = {
    method: 'put',
    url: 'https://api-vtm.intelin.vn/public/otp',
    headers: {},
  };
  return (
    <RegisterOTPComponent
      apiResendOtp={apiResendOtp}
      apiHandleOTP={apiHandleOTP}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexRegisterOTP;
