import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ComponentDashboardSale from './component';
const config = new Config().getState();

const IndexDashboardSale = () => {
  const auth = AuthService.getPackageAuth();

  const apiSale: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.dashboard.sale,
    headers: {
      token: auth?.token,
    },
  };
  return <ComponentDashboardSale apiSale={apiSale} />;
};

export default IndexDashboardSale;
