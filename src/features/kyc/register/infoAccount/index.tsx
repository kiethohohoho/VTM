import React from 'react';

import { type IIndexOfView } from '../type';
import ComponentInfoAccount from './component';

const IndexInfoAccount: React.FC<IIndexOfView> = ({ handleBack, handleGetResponseSuccess, responseSuccess }) => {
  return (
    <ComponentInfoAccount
      responseSuccess={responseSuccess}
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexInfoAccount;
