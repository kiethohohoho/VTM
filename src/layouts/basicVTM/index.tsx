import React, { Suspense } from 'react';

import { ScreenLoader } from '@/core2/loader';

import DialogRoot from '../dialog';

interface ILayoutBasicAntD {
  children: React.ReactNode;
}

const LayoutBasicAntD: React.FC<ILayoutBasicAntD> = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <header></header>
        <main>
          <Suspense fallback={<ScreenLoader main />}>{children}</Suspense>
        </main>
      </div>
      <DialogRoot />
    </React.Fragment>
  );
};

export default LayoutBasicAntD;
