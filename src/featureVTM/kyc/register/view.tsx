import { Flex } from 'antd';

import { styleBg } from '@/featureVTM/type';

import IndexRegisterAccount from './registerAccount';
import IndexRegisterInformation from './registerinformation';
import IndexRegisterLicense from './registerlinesince';
import IndexRegisterOTP from './registerotp';
import IndexRegisterSuccess from './registerSuccess';
import { type IRenderViewVTM, type RegisterViewVTMProps, VIEW_REGISTER_VTM } from './type';

const RegisterView = ({
  handleGetResponseSuccess,
  view,
  responseSuccess,
  handleBack,
  loading,
}: RegisterViewVTMProps) => {
  const renderView: IRenderViewVTM = {
    [VIEW_REGISTER_VTM.INFO_ACCOUNT]: (
      <IndexRegisterInformation
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
        handleBack={handleBack}
      />
    ),
    [VIEW_REGISTER_VTM.REGISTER_OTP]: (
      <IndexRegisterOTP
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_REGISTER_VTM.REGISTER]: (
      <IndexRegisterLicense
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_REGISTER_VTM.REGISTER_ACCOUNT]: (
      <IndexRegisterAccount
        responseSuccess={responseSuccess}
        handleGetResponseSuccess={handleGetResponseSuccess}
      />
    ),
    [VIEW_REGISTER_VTM.REGISTER_SUCCESS]: <IndexRegisterSuccess />,
  };
  return <Flex style={styleBg}>{renderView[view]}</Flex>;
};

export default RegisterView;
