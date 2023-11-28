import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ComponentPersonal from './component';
const config = new Config().getState();
const IndexPersonal = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.kyc.logout,
    headers: { token: auth?.token },
  };
  return <ComponentPersonal api={api} />;
};

export default IndexPersonal;
