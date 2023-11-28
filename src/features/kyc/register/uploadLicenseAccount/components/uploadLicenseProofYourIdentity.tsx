import React from 'react';

import uploadProof from '@/assets/images/icon/proof.svg';
import qr from '@/assets/images/icon/qr-code.svg';
import { Localize } from '@/context/languages';
import { RadioGroupRoot } from '@/core2/input';
import { type IDataRadioRoot } from '@/core2/input/radio/types';
import { UploadRoot } from '@/core2/upload';

enum ProofYourIdentity {
  ID_CARD = 0,
  PASSPORT,
}

const dataProofYourIdentity: IDataRadioRoot[] = [
  {
    label: 'register.chooseYourIdentityType.idCard',
    value: ProofYourIdentity.ID_CARD,
  },
  {
    label: 'register.chooseYourIdentityType.passport',
    value: ProofYourIdentity.PASSPORT,
  },
];

interface ICardUpload {
  name: string;
  onChange?: (event: any, name: string) => void;
  title: string;
  disable?: boolean;
}

const CardUpload: React.FC<ICardUpload> = ({ name, title, onChange }) => {
  return (
    <React.Fragment>
      <div
        content='content'
        className='text-sm w-full flex items-center'>
        <div className='w-48'>
          <Localize tid={title} />
        </div>
        <div className='w-full h-px bg-primary-focus-lv2' />
      </div>
      <div className='flex gap-10 items-center'>
        <UploadRoot
          type='CCCD'
          onChange={event => {
            onChange && onChange(event, name);
          }}
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

interface IUploadLicenseProofYourIdentity {
  disable?: boolean;
  handleOnChangeImage: (event: any, name: string) => void;
}
const UploadLicenseProofYourIdentity: React.FC<IUploadLicenseProofYourIdentity> = ({
  disable,
  handleOnChangeImage,
}) => {
  return (
    <div className='flex flex-column gap-4 mt-3'>
      <div className='flex gap-4 justify-center'>
        <div className='w-10 h-10 flex justify-center items-center bg-primary-focus-lv2 rounded-full'>1</div>
        <div className='flex flex-column gap-4'>
          <div>
            <p className='m-0'>
              <Localize tid='register.chooseYourIdentityType' />
            </p>
            <p className='m-0 text-sm text-neutral-80'>
              <Localize tid='register.chooseYourIdentityType.description' />
            </p>
          </div>
          <RadioGroupRoot
            defaultValue={dataProofYourIdentity[0].value}
            layout='horizontal'
            data={dataProofYourIdentity}
            id='idCard'
            name='idCard'
          />
        </div>
      </div>
      <div
        className={`border border-primary-focus-lv2 border-solid p-4 ${
          disable ? 'bg-neutral-20' : 'bg-white'
        } rounded-lg flex flex-column gap-4 mt-4`}>
        <div className='flex items-center gap-4'>
          <img src={uploadProof} />
          <div className='text-base text-primary font-medium'>
            <Localize tid='register.chooseYourIdentityType.upload' />
          </div>
        </div>
        <CardUpload
          onChange={handleOnChangeImage}
          disable={disable}
          title='register.chooseYourIdentityType.fontSideIdCard'
          name='nationalIDFront'
        />
        <CardUpload
          onChange={handleOnChangeImage}
          disable={disable}
          title='register.chooseYourIdentityType.fontBackIdCard'
          name='nationalIDBack'
        />
      </div>
    </div>
  );
};

export default UploadLicenseProofYourIdentity;
