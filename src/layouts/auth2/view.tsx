import React from 'react';

import bg from '@/assets/images/background/backgroundKYC.png';

import LayoutAuthHeader from './components/header';
import { type IAuthLayoutView } from './types';

const View: React.FC<IAuthLayoutView> = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('${bg}')`,
      }}
      className='bg-KYC w-full h-full bg-cover'>
      <div
        style={{
          minHeight: '100dvh',
        }}
        className='flex gap-2 justify-center w-full w-max m-auto relative'>
        <div className='py-4'>
          <div
            style={{
              width: 700,
              borderRadius: '20px',
            }}
            className='bg-white/70 h-full flex flex-column'>
            <div className='p-8'>
              <LayoutAuthHeader />
            </div>
            <div className='h-full'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
