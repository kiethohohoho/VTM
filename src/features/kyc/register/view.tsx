import IndexInfoAccount from './infoAccount';
import IndexInfoByRole from './infoByRole';
import IndexRegisterInfo from './registerInformation';
import RegisterOTPComponent from './registerOTP';
import IndexRegisterSelectRole from './selectRoleAccount';
import IndexSendOTPRegister from './sendOTP';
import { type IRenderView, type RegisterViewProps, VIEW_REGISTER } from './type';
import IndexUploadLicenseAccount from './uploadLicenseAccount';

const View = ({ handleGetResponseSuccess, view, responseSuccess, handleBack, loading }: RegisterViewProps) => {
  const renderView: IRenderView = {
    [VIEW_REGISTER.REGISTER_OTP]: <RegisterOTPComponent handleGetResponseSuccess={handleGetResponseSuccess} />,
    [VIEW_REGISTER.SEND_OTP]: (
      <IndexSendOTPRegister
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
      />
    ),
    [VIEW_REGISTER.REGISTER]: (
      <IndexRegisterInfo
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
        loading={loading}
      />
    ),
    [VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT]: (
      <IndexUploadLicenseAccount
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
      />
    ),
    [VIEW_REGISTER.INFO_ACCOUNT]: (
      <IndexInfoAccount
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess.dataOCRLicenseAccount}
      />
    ),
    [VIEW_REGISTER.SELECT_ROLE]: (
      <IndexRegisterSelectRole
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
      />
    ),
    [VIEW_REGISTER.INFO_BY_ROLE]: (
      <IndexInfoByRole
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess.dataOCRLicenseBusiness}
        loading={loading}
      />
    ),
  };

  return <>{renderView[view]}</>;
};
export default View;
