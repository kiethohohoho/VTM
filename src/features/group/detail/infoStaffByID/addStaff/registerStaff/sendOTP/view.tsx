import React from 'react';

import { ButtonRoot } from '@/core2/button';
import { OPTRoot } from '@/core2/otp';

import { VIEW_REGISTER_STAFF } from '../register.interface';
interface IFormRegisterOTP {
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
  loading: boolean;
  handleSubmitSendOTPRegisterStaff: (value: string) => void;
  handleResendSendOTPRegisterStaff: () => void;
  phoneNumber: string;
}

const ViewStaff = ({
  handleBack,
  handleSubmitSendOTPRegisterStaff,
  loading,
  handleResendSendOTPRegisterStaff,
  phoneNumber,
}: IFormRegisterOTP) => {
  return (
    <React.Fragment>
      <OPTRoot
        onResent={() => {
          handleResendSendOTPRegisterStaff();
        }}
        numberPhone={phoneNumber}
        timeResent={20}
        // messageError='Đã có lỗi xảy ra.'
        onChange={(value: string) => {
          handleSubmitSendOTPRegisterStaff(value);
        }}
        length={6}
      />
      <div className='k-form-buttons ls-flex-col ls-gap_2'>
        <ButtonRoot
          loading={loading}
          type='button'
          style={{ border: 'none' }}
          onClick={() => {
            handleBack(VIEW_REGISTER_STAFF.REGISTER_OTP);
          }}></ButtonRoot>
      </div>
    </React.Fragment>
  );
};
export default ViewStaff;
