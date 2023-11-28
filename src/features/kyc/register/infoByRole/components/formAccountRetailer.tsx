import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React, { useState } from 'react';

import { Localize } from '@/context/languages';
import FormAddress, { type IGetValueAddress } from '@/core2/address';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import { UploadRoot } from '@/core2/upload';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormValueFormAccountRetailer, type IResponseComponentInfoByRole, VIEW_REGISTER } from '../../type';

interface ICardFormInfo {
  title: string;
  children: React.ReactNode;
}

const CardFormInfo: React.FC<ICardFormInfo> = ({ title, children }) => {
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
      <div className='flex gap-10 items-center'>{children}</div>
    </React.Fragment>
  );
};

interface IFormAccountRetailer {
  disable?: boolean;
  handleBack: (step: VIEW_REGISTER) => void;
  handleSubmit: (values: IFormValueFormAccountRetailer) => void;
  responseSuccess: IResponseComponentInfoByRole;
  loading?: boolean;
}
const FormAccountRetailer: React.FC<IFormAccountRetailer> = ({
  responseSuccess,
  disable,
  handleBack,
  handleSubmit,
  loading,
}) => {
  const [address, setAddress] = useState<IGetValueAddress>();
  const getValueAddress = (values: IGetValueAddress) => {
    setAddress(values);
  };
  return (
    <div className='flex flex-column gap-4'>
      <div
        className={`border border-primary-focus-lv2 border-solid p-4 ${
          disable ? 'bg-neutral-20' : 'white'
        } rounded-lg flex flex-column gap-4 mt-4`}>
        <CardFormInfo title='register.choose.font'>
          <Form
            onSubmitClick={(data: any) => {
              const values: any = data.values;
              if (address) {
                const retailer: IFormValueFormAccountRetailer = {
                  companyName: values.companyName,
                  registeredAt: values.registeredAt,
                  under: values.under,
                  formOfEnterprise: values.formOfEnterprise,
                  mainBusiness: values.mainBusiness,
                  nationalityLicense: values.nationalityLicense,
                  nameOwner: values.nameOwner,
                  taxNumber: values.taxNumber,
                  residence: values.residence,
                  address: values.addressRetailer,
                  phone: values.phoneRetailer,
                  classification: values.classification,
                  license: values.license,
                  countryCode: address.countryCode,
                  cityCode: address.cityCode,
                  districtCode: address.districtCode,
                  wardCode: address.wardCode,
                  name: values.nameRetailer,
                  cover: values.cover.files[0],
                  photo: values.photo.files[0],
                };
                handleSubmit(retailer);
              }
            }}
            initialValues={{
              companyName: responseSuccess?.COMPANY_NAME[0],
              registeredAt: responseSuccess?.REGISTERED_AT[0],
              under: responseSuccess?.UNDER[0],
              formOfEnterprise: responseSuccess?.NATIONALITY[0],
              mainBusiness: responseSuccess?.MAIN_BUSINESS_ACTIVITY[0],
              nationalityLicense: responseSuccess?.REGISTERED_AT[0],
              nameOwner: responseSuccess?.OWNER_NAME[0],
              taxNumber: responseSuccess?.TAX_NUMBER[0],
              residence: responseSuccess?.REPRESENTED_BY[0],
              addressRetailer: responseSuccess?.ADDRESS[0],
            }}
            validator={(values: any) => {
              return ValidatorComponent({
                values,
                validators: {
                  companyName: [VALIDATOR.EMPTY],
                  registeredAt: [VALIDATOR.EMPTY],
                  under: [VALIDATOR.EMPTY],
                  formOfEnterprise: [VALIDATOR.EMPTY],
                  mainBusiness: [VALIDATOR.EMPTY],
                  nationalityLicense: [VALIDATOR.EMPTY],
                  nameOwner: [VALIDATOR.EMPTY],
                  taxNumber: [VALIDATOR.EMPTY],
                  residence: [VALIDATOR.EMPTY],
                  phoneRetailer: [VALIDATOR.EMPTY],
                  classification: [VALIDATOR.EMPTY],
                  license: [VALIDATOR.EMPTY],
                  country: [VALIDATOR.EMPTY],
                  city: [VALIDATOR.EMPTY],
                  district: [VALIDATOR.EMPTY],
                  ward: [VALIDATOR.EMPTY],
                  nameRetailer: [VALIDATOR.EMPTY],
                  addressRetailer: [VALIDATOR.EMPTY],
                  cover: [VALIDATOR.EMPTY],
                  photo: [VALIDATOR.EMPTY],
                },
              });
            }}
            render={(formRenderProps: FormRenderProps) => {
              return (
                <FormElement>
                  <div className='grid grid-cols-2 gap-3'>
                    <InputRoot
                      label={'retailer.companyName'}
                      name='companyName'
                      id='companyName'
                    />
                    <InputRoot
                      label={'retailer.registeredAt'}
                      name='registeredAt'
                      id='registeredAt'
                    />
                    <InputRoot
                      label={'retailer.under'}
                      name='under'
                      id='under'
                    />
                    <InputRoot
                      label={'retailer.formOfEnterprise'}
                      name='formOfEnterprise'
                      id='formOfEnterprise'
                    />
                    <InputRoot
                      label={'retailer.mainBusiness'}
                      name='mainBusiness'
                      id='mainBusiness'
                    />
                    <InputRoot
                      label={'retailer.nationalityLicense'}
                      name='nationalityLicense'
                      id='nationalityLicense'
                    />
                    <InputRoot
                      label={'retailer.nameOwner'}
                      name='nameOwner'
                      id='nameOwner'
                    />
                    <InputRoot
                      label={'retailer.taxNumber'}
                      name='taxNumber'
                      id='taxNumber'
                    />
                    <InputRoot
                      label={'retailer.residence'}
                      name='residence'
                      id='residence'
                    />
                    <InputRoot
                      label={'phoneNumber'}
                      name='phoneRetailer'
                      id='phoneRetailer'
                    />
                    <InputRoot
                      label={'retailer.classification'}
                      name='classification'
                      id='classification'
                    />
                    <InputRoot
                      label={'retailer.license'}
                      name='license'
                      id='license'
                    />
                    <FormAddress
                      onChangeAddress={getValueAddress}
                      formRenderProps={formRenderProps}
                    />
                    <InputRoot
                      label={'name'}
                      name='nameRetailer'
                      id='nameRetailer'
                    />
                    <InputRoot
                      label={'retailer.address'}
                      name='addressRetailer'
                      id='addressRetailer'
                    />
                    <UploadRoot
                      isForm
                      name='cover'
                    />
                    <UploadRoot
                      isForm
                      name='photo'
                    />
                  </div>
                  <div
                    style={{
                      width: 550,
                    }}
                    className='mt-5 flex justify-end mb-4'>
                    <ButtonRoot
                      fillMode={'flat'}
                      icon='arrow-chevron-left'
                      text='register.back'
                      onClick={() => {
                        handleBack(VIEW_REGISTER.SELECT_ROLE);
                      }}
                    />
                    <ButtonRoot
                      loading={loading}
                      className='w-40'
                      text='confirm'
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
        </CardFormInfo>
      </div>
    </div>
  );
};

export default FormAccountRetailer;
