import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { OPTRoot } from '@/core2/otp';
import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { VIEW_REGISTER } from '../type';
interface IFormRegisterOTP {
  handleBack: (step: VIEW_REGISTER) => void;
  loading: boolean;
  handleSubmitSendOTPRegister: (value: string) => void;
  handleResendSendOTPRegister: () => void;
  phoneNumber: string;
}

const View = ({
  handleBack,
  handleSubmitSendOTPRegister,
  loading,
  handleResendSendOTPRegister,
  phoneNumber,
}: IFormRegisterOTP) => {
  return (
    <div className='flex flex-column justify-between h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='registerOTP' />
      </div>
      <div
        className='pb-28'
        style={{
          width: 350,
        }}>
        <OPTRoot
          onResent={handleResendSendOTPRegister}
          numberPhone={phoneNumber}
          timeResent={20}
          onChange={(value: string) => {
            handleSubmitSendOTPRegister(value);
          }}
          length={6}
        />
      </div>
      <div className='text-end w-full'>
        <div className='p-16'>
          <ButtonRoot
            type='button'
            fillMode={'flat'}
            icon='arrow-chevron-left'
            className='w-40'
            text='backButton'
            onClick={() => {
              handleBack(VIEW_REGISTER.REGISTER_OTP);
            }}>
            <Localize tid='account.backToRegisterOTP' />
          </ButtonRoot>
        </div>
      </div>
    </div>
  );
};
export default View;
