import React, { type FunctionComponent } from 'react';

import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { SELECT_ROLE, type VIEW_REGISTER } from '../type';
import FormAccountRetailer from './components/formAccountRetailer';
import FormBrand from './components/formBrand';

interface ViewInfoByRoleProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleSubmit: (values: any) => void;
  selectAccount: SELECT_ROLE;
  responseSuccess: any;
  loading?: boolean;
}

const ViewInfoByRole: FunctionComponent<ViewInfoByRoleProps> = ({
  responseSuccess,
  handleBack,
  handleSubmit,
  selectAccount,
  loading,
}) => {
  return (
    <div className='flex flex-column h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='register.choose.account.creator' />
      </div>
      <div>
        {selectAccount === SELECT_ROLE.RETAILER ? (
          <FormAccountRetailer
            loading={loading}
            responseSuccess={responseSuccess.dataOCR}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        ) : (
          <FormBrand
            loading={loading}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ViewInfoByRole;
