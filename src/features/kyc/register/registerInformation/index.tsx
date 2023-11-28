import { type IIndexOfView } from '../type';
import RegisterInformationComponent from './component';
const IndexRegisterInfo = (props: IIndexOfView) => {
  const { handleGetResponseSuccess, responseSuccess, handleBack, loading } = props;
  // const apiRegister: IApiRequest = {
  //   method: 'post',
  //   url: config.api.lsUser.kyc.register,
  //   headers: {},
  // };
  // const apiUpload: IApiRequest = {
  //   method: 'put',
  //   // url: config.api.userPortal.upload,
  //   url: '/portalUser/upload',
  //   host: 'https://api.dev.locstoc.com',
  //   headers: {
  //     token: auth?.token,
  //     'Content-Type': 'application/application/x-www-form-urlencoded',
  //   },
  // };
  return (
    <RegisterInformationComponent
      loading={loading}
      handleBackRegisterOTP={handleBack}
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexRegisterInfo;
