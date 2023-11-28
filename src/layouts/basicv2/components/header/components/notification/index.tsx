import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ComponentNotification from './component';
const config = new Config().getState();

const IndexNotification = () => {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.notification,
    headers: {
      token: auth?.token,
    },
  };
  const apiSeen: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.notification,
    headers: {
      token: auth?.token,
    },
  };
  const apiPushKey: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.device,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentNotification
      apiNotification={api}
      apiPushKey={apiPushKey}
      apiSeen={apiSeen}
    />
  );
};

export default IndexNotification;
