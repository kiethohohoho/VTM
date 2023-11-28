import React from 'react';

import { type IIndexOfView } from '../type';
import ComponentUploadLicenseAccount from './component';

const IndexUploadLicenseAccount: React.FC<IIndexOfView> = ({
  handleBack,
  handleGetResponseSuccess,
  responseSuccess,
}) => {
  // const apiOCRIdCard: IApiRequest = {
  //   method: 'post',
  //   // url: config.api.userPortal.upload,
  //   url: '/id_card',
  //   host: 'http://14.161.50.99:17227',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Basic c3RlbGFpOlN0M2xBSUAwMzA0MDA2MTg',
  //   },
  //   auth: {
  //     username: 'stelai',
  //     password: 'St3lAI@0304006187',
  //   },
  // };
  return (
    <ComponentUploadLicenseAccount
      responseSuccess={responseSuccess}
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexUploadLicenseAccount;
