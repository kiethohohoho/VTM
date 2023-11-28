import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import { type VIEW_LOGIN } from '../login.interface';
import { SendOTPLoginComponent } from './component';

const config = new Config().getState();

interface ISendOtp {
  phoneNumber: string;
  otpKey: string;
  handleBack: (step: VIEW_LOGIN) => void;
  handleChangeView: (step: VIEW_LOGIN) => void;
  handleSetSelectRoleToken: (token: string) => void;
}
const SendOtp = (props: ISendOtp) => {
  const { ...restProps } = props;
  const apiOtp: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.kyc.login,
    headers: {},
  };

  return (
    <SendOTPLoginComponent
      apiOtp={apiOtp}
      {...restProps}
    />
  );
};
export { SendOtp };
