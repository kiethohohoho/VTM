import React, { type FC } from 'react';

import { useScrollToTop } from '@/hooks/useScrollToTop';

import WrapperMain from '../components/waraper';

const Dashboard: FC = () => {
  useScrollToTop();
  /* render */
  return (
    <React.Fragment>
      <WrapperMain>Dashboard</WrapperMain>
    </React.Fragment>
  );
};
export default Dashboard;
