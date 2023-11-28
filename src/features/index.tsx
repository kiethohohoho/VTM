import { Outlet } from 'react-router-dom';

import LayoutBasicV2 from '@/layouts/basicv2';

function FeatureComponent() {
  return (
    <LayoutBasicV2>
      <Outlet />
    </LayoutBasicV2>
  );
}

export default FeatureComponent;
