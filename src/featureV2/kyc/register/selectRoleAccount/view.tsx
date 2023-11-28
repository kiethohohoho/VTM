import { type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import React, { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { RadioGroupRoot } from '@/core2/input';
import { type IDataRadioRoot } from '@/core2/input/radio/types';
import LayoutAuthTitle from '@/layouts/auth2/components/title';

import { SELECT_ROLE, VIEW_REGISTER } from '../type';
import UploadBusinessLicense from './components/uploadBusinessLicense';

interface ViewRegisterSelectRoleProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleOnChangeImage: (values: any) => void;
  handleOnchangeSelectRole: (event: RadioGroupChangeEvent) => void;
  handleSubmit: () => void;
  handleSkip: () => void;
  selectRole: SELECT_ROLE;
  isLoading: boolean;
  isShowBtn: boolean;
}
const listSelectRole: IDataRadioRoot[] = [
  {
    value: SELECT_ROLE.RETAILER,
    label: 'retailer.selectRetailer',
  },
  {
    value: SELECT_ROLE.BRAND,
    label: 'retailer.selectBrand',
  },
];
const ViewRegisterSelectRole: FunctionComponent<ViewRegisterSelectRoleProps> = ({
  handleBack,
  handleOnChangeImage,
  handleOnchangeSelectRole,
  handleSubmit,
  handleSkip,
  selectRole,
  isLoading,
  isShowBtn,
}) => {
  return (
    <div className='flex flex-column h-full items-center justify-between'>
      <div className='flex flex-column items-center'>
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
          <div className='flex flex-column gap-4 mt-3'>
            <div className='flex gap-4 justify-center'>
              <div className='w-10 h-10 flex justify-center items-center bg-primary-focus-lv2 rounded-full'>1</div>
              <div className='flex flex-column gap-4'>
                <div className='pt-2'>
                  <p className='m-0'>
                    <Localize tid='register.choose.business' />
                  </p>
                </div>
                <RadioGroupRoot
                  onChange={handleOnchangeSelectRole}
                  defaultValue={listSelectRole[0].value}
                  layout='horizontal'
                  data={listSelectRole}
                  id='selectRole'
                  name='selectRole'
                />
              </div>
            </div>
          </div>
          {selectRole === SELECT_ROLE.RETAILER && (
            <UploadBusinessLicense
              handleBack={handleBack}
              onChange={handleOnChangeImage}
            />
          )}

          <div
            style={{
              width: 550,
            }}
            className='mt-4 flex justify-end gap-2'>
            <ButtonRoot
              fillMode={'flat'}
              icon='arrow-chevron-left'
              text='register.back'
              onClick={() => {
                handleBack(VIEW_REGISTER.INFO_ACCOUNT);
              }}
            />
            {selectRole === SELECT_ROLE.RETAILER && (
              <ButtonRoot
                className='w-40'
                onClick={handleSkip}>
                <Localize tid='register.skip' />
                <span className='k-icon k-i-arrow-chevron-right pl-6' />
              </ButtonRoot>
            )}

            <ButtonRoot
              disabled={isShowBtn}
              loading={isLoading}
              className='w-40'
              themeColor={'primary'}
              onClick={handleSubmit}>
              <Localize tid='confirm' />
            </ButtonRoot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRegisterSelectRole;
