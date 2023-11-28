import { type IApiRequest } from '@/api/api.interface';
import AuthService from '@/utils/Auth';

import { type IIndexOfViewWithdrawVTM } from '../type';
import OTPComponent from './component';
const IndexWithdrawOTP = ({ responseSuccess, handleBack }: IIndexOfViewWithdrawVTM) => {
  const auth = AuthService.getPackageAuth();

  console.log('qqqq', auth);
  const apiHandleOTP: IApiRequest = {
    method: 'post',
    url: 'https://api-vtm.intelin.vn/auth/otp',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      checking: 'aa',
      token: auth?.token,
    },
  };
  const apiResendOtp: IApiRequest = {
    method: 'delete',
    url: 'https://api-vtm.intelin.vn/auth/otp',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      checking: 'aaqqqq',
      token: auth?.token,
    },
  };
  return (
    <OTPComponent
      apiResendOtp={apiResendOtp}
      apiHandleOTP={apiHandleOTP}
      responseSuccess={responseSuccess}
      handleBack={handleBack}
    />
  );
};

export default IndexWithdrawOTP;
