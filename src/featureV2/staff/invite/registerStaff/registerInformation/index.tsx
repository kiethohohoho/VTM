import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import SendOTPComponent from './component';
const config = new Config().getState();
const IndexRegisterInformationStaff = (props: any) => {
  const { handleGetResponseSuccess, responseSuccess, handleBack } = props;
  const apiRegister: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.staff._,
    headers: {},
  };
  return (
    <SendOTPComponent
      handleBack={handleBack}
      api={apiRegister}
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexRegisterInformationStaff;
