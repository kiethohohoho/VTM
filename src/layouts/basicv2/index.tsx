import React, { Suspense } from 'react';

import { ScreenLoader } from '@/core2/loader';

import DialogRoot from '../dialog';
import IndexDrawer from './components/drawer';
import IndexHeader from './components/header';

interface ILayoutBasicV2 {
  children: React.ReactNode;
}

const LayoutBasicV2: React.FC<ILayoutBasicV2> = ({ children }) => {
  return (
    <React.Fragment>
      <div className='h-fullDevice'>
        <header className='fixed w-full z-10 bg-white'>
          <IndexHeader />
        </header>
        <main
          style={{
            paddingTop: '64px',
          }}
          className='flex h-full w-full'>
          <div
            className='h-full'
            style={{
              marginRight: '1px',
            }}>
            <IndexDrawer />
          </div>
          <div
            style={{
              marginTop: '1px',
              minHeight: 'calc(100dvh - 70px)',
            }}
            className='bg-base w-full relative'>
            <Suspense fallback={<ScreenLoader main />}>{children}</Suspense>
          </div>
        </main>
      </div>
      <DialogRoot />
    </React.Fragment>
  );
};

export default LayoutBasicV2;
