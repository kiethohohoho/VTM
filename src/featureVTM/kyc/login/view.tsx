import { Flex } from 'antd';

import { styleBg } from '@/featureVTM/type';

import { VIEW_LOGIN } from './login.interface';
import IndexLogin from './loginForm';
import IndexLoginOTP from './loginOTP';
interface ILoginViewProps {
  isLoading?: boolean;
  view: VIEW_LOGIN;
  otpKey?: string;
  phoneNumber?: string;
  selectRoleToken?: string;
  selectStoreToken?: string;
  handleGetResponseSuccess: (dataItem: any) => void;
  responseSuccess: any;
  handleBack: (step: VIEW_LOGIN) => void;
  handleChangeView?: (step: VIEW_LOGIN) => void;
  handleSetSelectRoleToken?: (token: string) => void;
  handleSetSelectStoreToken?: (token: string) => void;
}
const ViewLogin = ({ view, handleBack, responseSuccess, handleGetResponseSuccess }: ILoginViewProps) => {
  const renderView: any = {
    [VIEW_LOGIN.LOGIN]: (
      <IndexLogin
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_LOGIN.LOGINOTP]: (
      <IndexLoginOTP
        handleBack={handleBack}
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
  };
  return (
    <Flex
      vertical
      style={styleBg}>
      {renderView[view]}
    </Flex>
  );
};

export default ViewLogin;
