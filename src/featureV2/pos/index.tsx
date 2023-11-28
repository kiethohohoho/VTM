import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ComponentPOS from './component';
const config = new Config().getState();

const IndexPOS = () => {
  const auth = AuthService.getPackageAuth();

  const searchBarcode: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.checkMultipleBarcode,
    headers: {
      token: auth?.token,
    },
  };
  const checkConsumer: IApiRequest = {
    method: 'get',
    url: config.api.lsOrder.consumer,
    headers: {
      token: auth?.token,
    },
  };
  const orderGoods: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.order,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentPOS
      orderGoods={orderGoods}
      searchBarcode={searchBarcode}
      checkConsumer={checkConsumer}
    />
  );
};

export default IndexPOS;
