import React from 'react';

import { VIEW_FORGOT_PASSWORD } from './component';
import EmailErrorComponent from './layout/emailError';
import EmailSuccessComponent from './layout/emailSuccess';
import NewPasswordComponent from './layout/newPassword';
import PhoneSuccessComponent from './layout/phoneSuccess';
import ForgotPasswordComponent from './layout/requestForgot';
import { type ForgotViewProps } from './types';

const View = (props: ForgotViewProps) => {
  const {
    handleSubmit,
    handleSubmitOtp,
    handleReSendOtp,
    handleBack,
    handleSubmitNewPassword,
    viewRequest,
    viewData,
    loading,
    handleResetView,
    handleNavigate,
  } = props;

  return (
    <React.Fragment>
      {viewRequest === VIEW_FORGOT_PASSWORD.REQUEST && (
        <ForgotPasswordComponent
          loading={loading}
          viewData={viewData}
          handleSubmit={handleSubmit}
          handleNavigate={handleNavigate}
        />
      )}
      {viewRequest === VIEW_FORGOT_PASSWORD.EMAIL_SUCCESS && <EmailSuccessComponent handleNavigate={handleNavigate} />}
      {viewRequest === VIEW_FORGOT_PASSWORD.EMAIL_ERROR && <EmailErrorComponent handleResetView={handleResetView} />}
      {viewRequest === VIEW_FORGOT_PASSWORD.PHONE_SUCCESS && (
        <PhoneSuccessComponent
          handleBack={handleBack}
          handleNavigate={handleNavigate}
          viewData={viewData}
          handleSubmitOtp={handleSubmitOtp}
          loading={loading}
          handleReSendOtp={handleReSendOtp}
        />
      )}
      {viewRequest === VIEW_FORGOT_PASSWORD.NEW_PASSWORD && (
        <NewPasswordComponent
          handleNavigate={handleNavigate}
          viewData={viewData}
          handleSubmitNewPassword={handleSubmitNewPassword}
          loading={loading}
        />
      )}
    </React.Fragment>
  );
};
export default View;
