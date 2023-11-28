import React from 'react';

import { type IAuthLayoutComponent } from './types';
import View from './view';

const Component: React.FC<IAuthLayoutComponent> = ({ ...props }) => {
  return <View {...props} />;
};

export default Component;
