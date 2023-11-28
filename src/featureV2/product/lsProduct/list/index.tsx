import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentProduct } from './component';

const config = new Config().getState();

const IndexProduct = () => {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.product,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentProduct api={api} />;
};

export default IndexProduct;
