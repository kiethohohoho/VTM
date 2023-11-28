import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentGroup } from './component';

const config = new Config().getState();
interface IIndexGroup {
  onRequestSuccessListGroup?: (data: any) => void;
}
const IndexGroup = (props: IIndexGroup) => {
  const { onRequestSuccessListGroup } = props;
  const auth = AuthService.getPackageAuth();
  const apiListGroup: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.staff.groupStaff,
    headers: {
      token: auth?.token,
    },
  };
  const apiCreateGroup: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.staff.groupStaff,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentGroup
      onRequestSuccessListGroup={onRequestSuccessListGroup}
      apiListGroup={apiListGroup}
      apiCreateGroup={apiCreateGroup}
    />
  );
};

export default IndexGroup;
