import { type IApiRequest } from '@/api/api.interface';

import { type IIndexOfViewInForVTM } from '../type';
import RegisterInformationComponent from './component';

const IndexRegisterInformation = ({ handleGetResponseSuccess, responseSuccess, handleBack }: IIndexOfViewInForVTM) => {
  const apiRegister: IApiRequest = {
    method: 'post',
    url: `https://api-vtm.intelin.vn/public/register`,
    headers: {},
  };

  return (
    <RegisterInformationComponent
      apiRegister={apiRegister}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      handleBack={handleBack}
    />
  );
};

export default IndexRegisterInformation;
