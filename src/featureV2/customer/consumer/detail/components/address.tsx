import React from 'react';

import { CardForm } from '@/core2/card';
import { ItemVertical } from '@/core2/item';

import { type IResponseDetail } from '../types';

interface IAddressConsumer extends Pick<IResponseDetail, 'phone'> {}
const AddressConsumer: React.FC<IAddressConsumer> = ({ phone }) => {
  return (
    <CardForm className='shadow-none border border-solid border-neutral-40'>
      <div className='text-2xl font-bold'>Default Address</div>
      <div className='flex flex-column gap-4 mt-4'>
        <ItemVertical
          content='-'
          label='Address'
        />
        <ItemVertical
          content='-'
          label='Email'
        />
        <ItemVertical
          content={phone}
          label='Phone'
        />
      </div>
    </CardForm>
  );
};

export default AddressConsumer;
