import React from 'react';

import { type IIndexOfView } from '../type';
import ComponentRegisterSelectRole from './component';

const IndexRegisterSelectRole: React.FC<IIndexOfView> = ({ handleBack, handleGetResponseSuccess }) => {
  return (
    <ComponentRegisterSelectRole
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};
export default IndexRegisterSelectRole;
