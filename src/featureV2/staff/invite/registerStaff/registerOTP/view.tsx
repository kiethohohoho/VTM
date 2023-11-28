import React from 'react';

import { Localize } from '@/context/languages';
import { ScreenLoader } from '@/core2/loader';

import { type IFormValueRegisterOTPStaff } from '../register.interface';

interface IFormRegisterOTP {
  handleNavigate: (url: string) => void;
  loading: boolean;
  handleSubmit: (values: Record<string, IFormValueRegisterOTPStaff>) => void;
}

const View = ({ handleNavigate, handleSubmit, loading }: IFormRegisterOTP) => {
  return (
    <React.Fragment>{loading ? <ScreenLoader /> : <Localize tid={'staff.tokenRegisterExpired'} />}</React.Fragment>
  );
};
export default View;
