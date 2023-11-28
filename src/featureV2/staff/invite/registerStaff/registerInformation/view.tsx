import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm } from '@/core2/card';
import { InputPassword } from '@/core2/input';

import { type IFormValueRegisterInformationStaff, type VIEW_REGISTER_STAFF } from '../register.interface';

interface IFormRegisterInformation {
  loading: boolean;
  handleSubmit: (values: Record<string, IFormValueRegisterInformationStaff>) => void;
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
}

const View = ({ handleSubmit, loading, handleBack }: IFormRegisterInformation) => {
  return (
    <div style={{ width: '400px' }}>
      <CardForm className='mt-4'>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='flex flex-column gap-2 items-end w-full'>
                  <InputPassword
                    label={'account.passwordLabel'}
                    id={'password'}
                    name={'password'}
                  />
                  <InputPassword
                    label={'account.confirmPasswordLabel'}
                    id={'confirmPassword'}
                    name={'confirmPassword'}
                  />

                  <ButtonRoot
                    loading={loading}
                    themeColor={'primary'}
                    disabled={!formRenderProps.valid}
                    type='submit'
                    text='account.loginButton'>
                    <Localize tid='confirm' />
                  </ButtonRoot>
                </div>
              </FormElement>
            );
          }}
        />
      </CardForm>
    </div>
  );
};
export default View;
