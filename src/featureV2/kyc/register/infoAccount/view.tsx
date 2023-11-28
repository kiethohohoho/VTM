import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React, { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DatePickerRoot } from '@/core2/datepicker';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { UploadRoot } from '@/core2/upload';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { EnumGender, EnumGenderKhmer, EnumNationalIDType } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormValueInfoAccountComponent, type IResponseComponentInfoAccount, VIEW_REGISTER } from '../type';

interface ViewInfoAccountProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleSubmit: (values: IFormValueInfoAccountComponent) => void;
  responseSuccess: IResponseComponentInfoAccount;
}

const listNationalIDType: IItemDataDropDown[] = [
  {
    id: EnumNationalIDType.CCCD,
    text: 'cccd',
  },
  {
    id: EnumNationalIDType.CMND,
    text: 'cmnd',
  },
  {
    id: EnumNationalIDType.PASSPORT,
    text: 'passport',
  },
  {
    id: EnumNationalIDType.NATIONAL_ID,
    text: 'nationalID',
  },
];
const listGender = [
  {
    id: EnumGender.MALE,
    text: 'male',
  },
  {
    id: EnumGender.FEMALE,
    text: 'female',
  },
];
const ViewInfoAccount: FunctionComponent<ViewInfoAccountProps> = ({ handleBack, handleSubmit, responseSuccess }) => {
  return (
    <div className='flex flex-column h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle
          description='register.information.I.card.description'
          title='register.information.I.card'
        />
      </div>
      <div
        className='pb-5'
        style={{
          width: 550,
        }}>
        <Form
          initialValues={{
            name: responseSuccess?.eng_name,
            nationalIDType: responseSuccess && listNationalIDType[3],
            nationalID: responseSuccess?.card_id,
            gender:
              responseSuccess?.sex && (responseSuccess.sex === EnumGenderKhmer.MALE ? listGender[0] : listGender[1]),
            dob: responseSuccess?.birth_date
              ? Helper.convertToDate(Helper.dateTimeToMillisecondsKhmer(responseSuccess?.birth_date))
              : '',
            contactAddress: responseSuccess?.address,
            nationalIDFront: responseSuccess?.nationalIDFront
              ? [URL.createObjectURL(responseSuccess.nationalIDFront)]
              : null,
            nationalIDBack: responseSuccess?.nationalIDBack
              ? [URL.createObjectURL(responseSuccess.nationalIDBack)]
              : null,
          }}
          validator={(values: any) => {
            return ValidatorComponent({
              values,
              validators: {
                name: [VALIDATOR.EMPTY],
                nationalIDType: [VALIDATOR.EMPTY],
                nationalID: [VALIDATOR.EMPTY],
                gender: [VALIDATOR.EMPTY],
                dob: [VALIDATOR.EMPTY],
                contactAddress: [VALIDATOR.EMPTY],
                nationalIDFront: [VALIDATOR.EMPTY],
                nationalIDBack: [VALIDATOR.EMPTY],
              },
            });
          }}
          onSubmitClick={(data: any) => {
            handleSubmit(data.values);
          }}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='w-full grid grid-cols-2 gap-3'>
                  <div className='col-span-2'>
                    <InputRoot
                      name='name'
                      label='register.fullName'
                    />
                  </div>
                  <DropDownRoot
                    isForm
                    label='register.Nationality'
                    name='nationalIDType'
                    data={listNationalIDType}
                  />
                  <InputRoot
                    name='nationalID'
                    label='register.No.ID.Card'
                  />
                  <UploadRoot
                    isFile
                    type='CCCD'
                    label='register.chooseYourIdentityType.fontSideIdCard'
                    isForm
                    name='nationalIDFront'
                  />
                  <UploadRoot
                    isFile
                    type='CCCD'
                    label='register.chooseYourIdentityType.fontBackIdCard'
                    isForm
                    name='nationalIDBack'
                  />
                  <DropDownRoot
                    defaultValue={
                      responseSuccess?.sex &&
                      (responseSuccess.sex === EnumGenderKhmer.MALE ? listGender[0] : listGender[1])
                    }
                    isForm
                    data={listGender}
                    label='register.Sex'
                    name='gender'
                  />

                  <DatePickerRoot
                    isForm
                    label='register.DateOfBirth'
                    name='dob'
                  />
                  <div className='col-span-2'>
                    <InputRoot
                      name='contactAddress'
                      label='contactAddress'
                    />
                  </div>
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <ButtonRoot
                    fillMode={'flat'}
                    icon='arrow-chevron-left'
                    className='w-40'
                    text='register.back'
                    onClick={() => {
                      handleBack(VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT);
                    }}>
                    <Localize tid='register.back' />
                  </ButtonRoot>
                  <ButtonRoot
                    className='w-40'
                    text='confirm'
                    size={'medium'}
                    themeColor={'primary'}
                    disabled={!formRenderProps.valid}
                    type='submit'>
                    <Localize tid='confirm' />
                  </ButtonRoot>
                </div>
              </FormElement>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ViewInfoAccount;
