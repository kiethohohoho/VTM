import React from 'react';

import { Localize } from '@/context/languages';
import { CardForm } from '@/core2/card';
import { ItemRoot } from '@/core2/item';

import { type IResponseDetail } from '../component';

interface IDetailOrderSummary {
  detail: IResponseDetail;
}

function DetailOrderSummary(props: IDetailOrderSummary) {
  const { detail } = props;
  return (
    <CardForm className='border border-solid border-neutral-40 p-6'>
      <div className='w-70 h-max xl:w-full'>
        <h1 className='m-0 text-xl mb-6 font-bold'>Summary</h1>
        <div
          className='flex flex-column gap-4'
          style={{ fontSize: '16px' }}>
          <ItemRoot
            label={'items.subtotal'}
            content={detail.totalAmount}
          />
          <ItemRoot
            label={'discount'}
            content={'0'}
          />
          <ItemRoot
            label={'tax'}
            content={'0'}
          />
          <ItemRoot
            label={'subtotal'}
            content={'0'}
          />
          <ItemRoot
            label={'shippingCost'}
            content={'0'}
          />
        </div>
        <div className='border border-dashed my-4 border-neutral-40' />
        <div className='flex justify-between items-center'>
          <h4 className='font-bold text-xl m-0'>
            <Localize tid={'total'}></Localize>:
          </h4>
          <h4 className='font-bold text-xl m-0'>{detail.totalAmount}</h4>
        </div>
      </div>
    </CardForm>
  );
}

export { DetailOrderSummary };
