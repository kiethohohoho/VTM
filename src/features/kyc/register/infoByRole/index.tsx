import React from 'react';

import { type IIndexOfView } from '../type';
import ComponentInfoByRole from './component';

const IndexInfoByRole: React.FC<IIndexOfView> = ({
  handleBack,
  handleGetResponseSuccess,
  responseSuccess,
  loading,
}) => {
  return (
    <ComponentInfoByRole
      loading={loading}
      responseSuccess={responseSuccess}
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexInfoByRole;
