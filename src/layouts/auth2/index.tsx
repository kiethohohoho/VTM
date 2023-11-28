import React from 'react';
import { Outlet } from 'react-router-dom';

import Component from './component';

const AuthLayoutComponent: React.FC = () => {
  return (
    <Component>
      <Outlet />
    </Component>
  );
};

export default AuthLayoutComponent;
