import React, { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { VIEW_REGISTER } from '../type';
import UploadLicenseProofYourIdentity from './components/uploadLicenseProofYourIdentity';

interface ViewUploadLicenseAccountProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleSubmit: () => void;
  handleOnChangeImage: (event: any, name: string) => void;
  handleSkip: () => void;
  isShowBtn: boolean;
}

const ViewUploadLicenseAccount: FunctionComponent<ViewUploadLicenseAccountProps> = ({
  handleBack,
  handleSubmit,
  handleOnChangeImage,
  handleSkip,
  isShowBtn,
}) => {
  return (
    <div className='flex flex-column h-full items-center'>
      <div className='text-center'>
        <LayoutAuthTitle
          description='register.proofYourIdentity.description'
          title='register.proofYourIdentity'
        />
      </div>
      <div
        style={{
          width: 550,
        }}>
        <UploadLicenseProofYourIdentity handleOnChangeImage={handleOnChangeImage} />
      </div>
      <div
        style={{
          width: 550,
        }}
        className='mt-4 flex justify-end gap-5'>
        <ButtonRoot
          fillMode={'flat'}
          icon='arrow-chevron-left'
          text='register.back'
          onClick={() => {
            handleBack(VIEW_REGISTER.REGISTER);
          }}
        />
        <ButtonRoot
          className='w-40'
          onClick={handleSkip}>
          <Localize tid='register.skip' />
          <span className='k-icon k-i-arrow-chevron-right pl-6' />
        </ButtonRoot>
        <ButtonRoot
          disabled={isShowBtn}
          className='w-40'
          themeColor={'primary'}
          onClick={handleSubmit}>
          <Localize tid='confirm' />
        </ButtonRoot>
      </div>
    </div>
  );
};

export default ViewUploadLicenseAccount;
