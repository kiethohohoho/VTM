import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ProfileComponent from './component';

/* variable */
const config = new Config().getState();

function ProfileIndex() {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.kyc.profile,
    headers: { token: auth?.token },
  };
  return <ProfileComponent api={api} />;
}

export default React.memo(ProfileIndex);
