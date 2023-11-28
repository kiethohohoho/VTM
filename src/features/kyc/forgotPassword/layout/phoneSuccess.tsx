import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { OPTRoot } from '@/core2/otp';
import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { type IViewData } from '../types';
interface Props {
  viewData: IViewData;
  handleSubmitOtp: (code: string) => void;
  handleReSendOtp: () => void;
  handleNavigate: (url: string) => void;
  handleBack: () => void;
  loading: boolean;
}

const PhoneSuccessComponent: FunctionComponent<Props> = props => {
  const { viewData, handleSubmitOtp, handleReSendOtp, handleBack } = props;

  return (
    <div className='flex flex-column justify-between h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='account.forgotOtpConfirmTitle' />
        <div>
          <Localize tid='account.forgotSubTitleOtp' />: {viewData?.data?.contact}
        </div>
      </div>
      <div
        className='pb-60'
        style={{
          width: 300,
        }}>
        <OPTRoot
          length={6}
          timeResent={5}
          onResent={handleReSendOtp}
          onChange={handleSubmitOtp}
        />
        <div className='pt-4'>
          <ButtonRoot
            fillMode='flat'
            themeColor='secondary'
            icon='arrow-chevron-left'
            onClick={handleBack}
            className='w-full'
            text='account.forgotBackButton'
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneSuccessComponent;
