import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentStaff } from './component';
const config = new Config().getState();

const IndexStaff = () => {
  const auth = AuthService.getPackageAuth();
  const apiListStaff: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.staff._,
    headers: {
      token: auth?.token,
    },
  };
  const apiInviteStaff: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.staff.invite,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentStaff
      apiListStaff={apiListStaff}
      apiInviteStaff={apiInviteStaff}
    />
  );
};

export default IndexStaff;
