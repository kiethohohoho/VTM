import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import RegisterOTPComponent from './component';
const config = new Config().getState();
const IndexRegisterOTPStaff = (props: any) => {
  const { handleGetResponseSuccess } = props;
  const apiCheckToken: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.staff.checkToken,
    headers: {},
  };
  const apiOtp: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.staff.otp,
    headers: {},
  };
  return (
    <RegisterOTPComponent
      api={apiOtp}
      apiCheckToken={apiCheckToken}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexRegisterOTPStaff;
