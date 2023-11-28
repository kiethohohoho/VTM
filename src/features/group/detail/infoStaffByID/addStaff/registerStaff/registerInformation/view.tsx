import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputPassword } from '@/core2/input';

import { type IFormValueRegisterInformationStaff, type VIEW_REGISTER_STAFF } from '../register.interface';

interface IFormRegisterInformation {
  loading: boolean;
  handleSubmit: (values: Record<string, IFormValueRegisterInformationStaff>) => void;
  handleBack: (step: VIEW_REGISTER_STAFF) => void;
}

const View = ({ handleSubmit, loading, handleBack }: IFormRegisterInformation) => {
  return (
    <React.Fragment>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <>
              <FormElement>
                <div className='ls-flex ls-flex-col ls-gap_2'>
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
                </div>

                <div className='k-form-buttons ls-flex-col ls-gap_2'>
                  <ButtonRoot
                    className='ls-w_full'
                    loading={loading}
                    disabled={!formRenderProps.valid}
                    type='submit'>
                    <Localize tid='confirm' />
                  </ButtonRoot>
                </div>
              </FormElement>
            </>
          );
        }}
      />
    </React.Fragment>
  );
};
export default View;
