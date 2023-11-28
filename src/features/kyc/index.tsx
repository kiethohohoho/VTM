import { Outlet } from 'react-router-dom';

import LayoutBasic from '@/layouts/basicv2';

function KYCComponent() {
  return (
    <LayoutBasic>
      <Outlet />
    </LayoutBasic>
  );
}

export default KYCComponent;
