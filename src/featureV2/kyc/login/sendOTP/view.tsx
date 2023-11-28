import { ButtonRoot } from '@/core2/button';
import { OPTRoot } from '@/core2/otp';
import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { VIEW_LOGIN } from '../login.interface';
interface IFormRegisterOTP {
  handleBack: (step: VIEW_LOGIN) => void;
  loading: boolean;
  handleSubmit: (value: string) => void;
  phoneNumber: string;
}

const View = ({ handleBack, handleSubmit, loading, phoneNumber }: IFormRegisterOTP) => {
  return (
    <div className='flex flex-column justify-between h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='registerOTP' />
      </div>
      <div
        className='pb-28'
        style={{
          width: 320,
        }}>
        <OPTRoot
          numberPhone={phoneNumber}
          isResend={false}
          onChange={(value: string) => {
            handleSubmit(value);
          }}
          length={6}
          timeResent={20}
        />
      </div>
      <div className='text-end w-full'>
        <div className='p-16'>
          <ButtonRoot
            fillMode={'flat'}
            icon='arrow-chevron-left'
            onClick={() => {
              handleBack(VIEW_LOGIN.LOGIN);
            }}
            className='w-40'
            text='account.forgotBackButton'
          />
        </div>
      </div>
    </div>
  );
};
export default View;
