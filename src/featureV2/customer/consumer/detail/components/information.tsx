import { Avatar } from '@progress/kendo-react-layout';
import React from 'react';

import avatarDefault from '@/assets/imagesV2/common/defaultAvatar.jpg';
import { CardForm } from '@/core2/card';
import { Helper } from '@/utils/Helper';

import { type IResponseDetail } from '../types';

interface IInformationConsumer extends Pick<IResponseDetail, 'name' | 'registrationDate'> {}

const InformationConsumer: React.FC<IInformationConsumer> = ({ name, registrationDate }) => {
  return (
    <CardForm className='shadow-none border border-solid border-neutral-40'>
      <div className='flex items-center gap-5'>
        <div>
          <Avatar
            style={{
              width: 150,
              height: 150,
            }}
            type='image'>
            <img
              src={avatarDefault}
              alt='avatar'
            />
          </Avatar>
        </div>
        <div className='flex flex-column gap-1'>
          <div className='text-2xl font-bold'>{name}</div>
          <div className='text-neutral-70'>Joined {Helper.formatDate(registrationDate)}</div>
        </div>
      </div>
    </CardForm>
  );
};

export default InformationConsumer;
