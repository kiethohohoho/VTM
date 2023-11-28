import React from 'react';

import { type IAuthLayoutComponent } from './types';
import View from './view';

const Component: React.FC<IAuthLayoutComponent> = ({ ...other }) => {
  return <View {...other} />;
};

export default Component;
