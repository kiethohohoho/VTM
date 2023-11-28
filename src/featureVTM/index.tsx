import { Outlet } from 'react-router-dom';

import LayoutBasicAntD from '@/layouts/basicVTM';

function FeatureAntDComponent() {
  return (
    <LayoutBasicAntD>
      <Outlet />
    </LayoutBasicAntD>
  );
}

export default FeatureAntDComponent;
