import React from 'react';

import qr from '@/assets/images/icon/qr-code.svg';
import { Localize } from '@/context/languages';
import { UploadRoot } from '@/core2/upload';

import { type VIEW_REGISTER } from '../../type';

interface ICardUpload {
  name: string;
  onChange?: (event: any) => void;
  title: string;
  disable?: boolean;
}

const CardUpload: React.FC<ICardUpload> = ({ name, title, onChange, disable }) => {
  return (
    <React.Fragment>
      <div
        content='content'
        className='text-sm w-full flex items-center'>
        <div className='w-80'>
          <Localize tid={title} />
        </div>
        <div className='w-full h-px bg-primary-focus-lv2' />
      </div>
      <div className='flex gap-10 items-center'>
        <UploadRoot
          type='CCCD'
          disable={disable}
          onChange={onChange}
          isForm={false}
          name={name}
        />
        <div>Or</div>
        <div>
          <img src={qr} />
        </div>
      </div>
    </React.Fragment>
  );
};

interface IUploadBusinessLicense {
  disable?: boolean;
  onChange?: (event: any) => void;
  handleBack: (step: VIEW_REGISTER) => void;
}
const UploadBusinessLicense: React.FC<IUploadBusinessLicense> = ({ disable, onChange, handleBack }) => {
  return (
    <React.Fragment>
      <div
        className={`border border-primary-focus-lv2 border-solid p-4 ${
          disable ? 'bg-neutral-20' : 'white'
        } rounded-lg flex flex-column gap-4 mt-4`}>
        <CardUpload
          disable={disable}
          title='register.choose.font'
          name='fontCard'
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );
};

export default UploadBusinessLicense;
