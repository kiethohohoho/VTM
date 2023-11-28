import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm } from '@/core2/card';
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
    <div style={{ width: '400px' }}>
      <CardForm className='mt-4'>
        <div className='flex flex-column gap-2 items-end'>
          <OPTRoot
            onResent={() => {
              handleResendSendOTPRegisterStaff();
            }}
            numberPhone={phoneNumber}
            timeResent={20}
            onChange={(value: string) => {
              handleSubmitSendOTPRegisterStaff(value);
            }}
            length={6}
          />
          <ButtonRoot
            loading={loading}
            type='button'
            themeColor='primary'
            style={{ border: 'none' }}
            onClick={() => {
              handleBack(VIEW_REGISTER_STAFF.REGISTER_OTP);
            }}>
            <Localize tid='confirm' />
          </ButtonRoot>
        </div>
      </CardForm>
    </div>
  );
};
export default ViewStaff;
