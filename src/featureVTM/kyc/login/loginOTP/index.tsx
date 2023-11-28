import { type IApiRequest } from '@/api/api.interface';

import { type VIEW_LOGIN } from '../login.interface';
import LoginOTPComponent from './component';

export interface IIndexOfViewInForVTM {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  handleBack: (step: VIEW_LOGIN) => void;
  loading?: boolean;
}

const IndexLoginOTP = ({ handleBack, responseSuccess, handleGetResponseSuccess }: IIndexOfViewInForVTM) => {
  const apiLoginOTP: IApiRequest = {
    method: 'post',
    url: 'https://api-vtm.intelin.vn/auth/otp',
    headers: {
      'Content-Type': 'application/json',
      'device-id': responseSuccess?.responseOTP?.auth?.deviceID,
      checking: '312312312312312312312',
      token: responseSuccess?.responseOTP?.auth?.token,
    },
  };

  const apiResendOtp: IApiRequest = {
    method: 'delete',
    url: 'https://api-vtm.intelin.vn/auth/otp',
    headers: {
      'Content-Type': 'application/json',
      'device-id': responseSuccess?.responseOTP?.auth?.deviceID,
      checking: 'aaaaa',
      token: responseSuccess?.responseOTP?.auth?.token,
    },
  };

  return (
    <LoginOTPComponent
      handleBack={handleBack}
      apiResendOTP={apiResendOtp}
      apiLoginOTP={apiLoginOTP}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexLoginOTP;
