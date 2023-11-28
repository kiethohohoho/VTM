import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import RegisterOTPComponent from './component';
const config = new Config().getState();
const IndexRegisterOTP = (props: any) => {
  const { handleGetResponseSuccess } = props;
  const apiOtp: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.kyc.otp,
    headers: {},
  };
  return (
    <RegisterOTPComponent
      api={apiOtp}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexRegisterOTP;
