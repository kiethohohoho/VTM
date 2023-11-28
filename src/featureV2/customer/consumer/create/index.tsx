import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentCreateConsumer } from './component';

const config = new Config().getState();
const IndexCreateConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentCreateConsumer api={api} />;
};

export default IndexCreateConsumer;
