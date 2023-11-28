import React from 'react';

import { type IAuthLayoutView } from './types';

const View: React.FC<IAuthLayoutView> = ({ children }) => {
  return <>{children}</>;
};

export default View;
