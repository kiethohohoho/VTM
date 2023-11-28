import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import SendOTPComponent from './component';
const config = new Config().getState();
const IndexSendOTPRegister = (props: any) => {
  const { handleGetResponseSuccess, responseSuccess, handleBack } = props;
  const url = config.api.lsUser.kyc.otp;
  const apiOtp: IApiRequest = {
    method: 'put',
    url,
    headers: {},
  };
  const apiResendOtp: IApiRequest = {
    method: 'delete',
    url,
    headers: {},
  };
  return (
    <SendOTPComponent
      handleBack={handleBack}
      apiOtp={apiOtp}
      apiResendOtp={apiResendOtp}
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexSendOTPRegister;
