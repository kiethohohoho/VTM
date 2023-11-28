import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentListConsumer } from './component';

const config = new Config().getState();

const IndexListConsumer = () => {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentListConsumer api={api} />;
};

export default IndexListConsumer;
