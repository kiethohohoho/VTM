import React, { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { EnumGender, EnumNationalIDType } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import ProfileView from './view';

interface IProfileComponent {
  api: IApiRequest;
}
export interface IItemResponse {
  userId: string;
  name: string;
  phone: string;
  userName: string;
  dob: number;
  email: string;
  gender: EnumGender;
  nationalIDType: EnumNationalIDType;
  nationalID: string;
  contactAddress: string;
}
export interface IStateProfile {
  data: IItemResponse;
}

/* initial */
const initialState: IStateProfile = {
  data: {
    userId: '',
    name: '',
    phone: '',
    userName: '',
    dob: 0,
    email: '',
    gender: EnumGender.FEMALE,
    nationalIDType: EnumNationalIDType.CCCD,
    nationalID: '',
    contactAddress: '',
  },
};

function ProfileComponent({ api }: IProfileComponent) {
  const [state, setState] = useState<IStateProfile>(initialState);
  /* callAPI */
  const funcRequest = {
    handleRequestSuccess: (data: IItemResponse) => {
      try {
        setState({ data });
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading } = useGet(api, funcRequest);
  /* view */
  return (
    <ProfileView
      loading={isLoading}
      data={state?.data}
    />
  );
}

export default React.memo(ProfileComponent);
