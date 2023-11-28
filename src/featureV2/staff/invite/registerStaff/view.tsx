import React from 'react';

import { type IRenderViewStaff, type RegisterViewPropsStaff, VIEW_REGISTER_STAFF } from './register.interface';
import RegisterInformationComponent from './registerInformation';
import RegisterOTPComponent from './registerOTP';
import SendOTPComponent from './sendOTP';
import Success from './success';

const View = ({ handleGetResponseSuccess, view, responseSuccess, handleBack }: RegisterViewPropsStaff) => {
  const renderView: IRenderViewStaff = {
    [VIEW_REGISTER_STAFF.REGISTER_OTP]: <RegisterOTPComponent handleGetResponseSuccess={handleGetResponseSuccess} />,
    [VIEW_REGISTER_STAFF.SEND_OTP]: (
      <SendOTPComponent
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
      />
    ),
    [VIEW_REGISTER_STAFF.REGISTER]: (
      <RegisterInformationComponent
        handleBack={handleBack}
        handleGetResponseSuccess={handleGetResponseSuccess}
        responseSuccess={responseSuccess}
      />
    ),
    [VIEW_REGISTER_STAFF.SUCCESS]: <Success />,
  };

  return (
    <React.Fragment>
      <div className='w-full flex flex-column items-center justify-between'>{renderView[view]}</div>
    </React.Fragment>
  );
};
export default View;
