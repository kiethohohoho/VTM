import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormValueFormAccountBrand, VIEW_REGISTER } from '../../type';

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
      <div>{children}</div>
    </React.Fragment>
  );
};

interface IFormBrand {
  disable?: boolean;
  handleBack: (step: VIEW_REGISTER) => void;
  handleSubmit: (values: IFormValueFormAccountBrand) => void;
  loading?: boolean;
}
const FormBrand: React.FC<IFormBrand> = ({ disable, handleBack, handleSubmit, loading }) => {
  return (
    <div className='flex flex-column gap-4 mt-3'>
      <div
        className={`border border-primary-focus-lv2 border-solid p-4 ${
          disable ? 'bg-neutral-20' : 'white'
        } rounded-lg flex flex-column gap-4 mt-4`}>
        <CardFormInfo title='register.choose.font'>
          <Form
            onSubmitClick={(data: any) => {
              const values: any = data.values;
              handleSubmit(values);
            }}
            validator={(values: any) => {
              return ValidatorComponent({
                values,
                validators: {
                  brandName: [VALIDATOR.EMPTY],
                  productType: [VALIDATOR.EMPTY],
                  headOffice: [VALIDATOR.EMPTY],
                },
              });
            }}
            render={(formRenderProps: FormRenderProps) => {
              return (
                <FormElement>
                  <div className='grid grid-cols-1 gap-3'>
                    <InputRoot
                      label={'retailer.brandName'}
                      name='brandName'
                      id='brandName'
                    />
                    <InputRoot
                      label={'retailer.productType'}
                      name='productType'
                      id='productType'
                    />
                    <InputRoot
                      label={'retailer.headOffice'}
                      name='headOffice'
                      id='headOffice'
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

export default FormBrand;
