import { type FunctionComponent } from 'react';

import { CardPage } from '@/core2/card';
import TabsRoot from '@/core2/tabs/root';

import DetailGroupStaffComponent from './infoGroupStaff';
import DetailStaffByIDComponent from './infoStaffByID';
const DetailGroupStaffGeneral: FunctionComponent = () => {
  return (
    <CardPage>
      <TabsRoot
        tabs={[
          {
            id: 0,
            component: <DetailStaffByIDComponent />,
            title: 'groupStaff.staffByID.detailTitle',
          },
          {
            id: 1,
            component: <DetailGroupStaffComponent />,
            title: 'groupStaff.detailTitle',
          },
        ]}
      />
    </CardPage>
  );
};
export default DetailGroupStaffGeneral;
