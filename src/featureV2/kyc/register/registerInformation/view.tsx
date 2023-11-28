import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { useEffect, useRef } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputPassword, InputRoot } from '@/core2/input';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { STATUS_YES_NO } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormValueRegisterInformationComponent, VIEW_REGISTER } from '../type';

interface IFormRegisterInformation {
  handleSubmit: (values: IFormValueRegisterInformationComponent) => void;
  handleBackRegisterOTP: (step: VIEW_REGISTER) => void;
  activateAccount: STATUS_YES_NO;
  loading?: boolean;
  responseSuccess: any;
}
const View = ({
  handleSubmit,
  handleBackRegisterOTP,
  activateAccount,
  loading,
  responseSuccess,
}: IFormRegisterInformation) => {
  const formRef = useRef<Form>(null);

  useEffect(() => {
    if (formRef.current?.valueGetter('password') && formRef.current?.valueGetter('confirmPassword')) {
      window.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
    }
  }, [formRef.current?.valueGetter('password'), formRef.current?.valueGetter('confirmPassword')]);

  return (
    <div className='flex flex-column h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='resister.information' />
      </div>
      <div
        className='py-10'
        style={{
          width: 350,
        }}>
        <Form
          ref={formRef}
          initialValues={{
            email: responseSuccess.dataStepRegister?.email || responseSuccess.dataStepRegister?.email,
            password: responseSuccess.dataStepRegister?.password || responseSuccess.dataStepRegister?.password,
            confirmPassword:
              responseSuccess.dataStepRegister?.confirmPassword || responseSuccess.dataStepRegister?.confirmPassword,
          }}
          validator={(values: any) => {
            return ValidatorComponent({
              values,
              validators: {
                password: [VALIDATOR.EMPTY],
                confirmPassword: [VALIDATOR.EMPTY],
                email: activateAccount === STATUS_YES_NO.NO ? [VALIDATOR.EMPTY] : [],
              },
            });
          }}
          onSubmitClick={(data: any) => {
            handleSubmit(data.values);
          }}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement>
              {activateAccount === STATUS_YES_NO.NO ? (
                <div className='w-full grid grid-cols-1 gap-5'>
                  <InputRoot
                    required
                    autoFocus={!formRenderProps.valueGetter('password')}
                    id='email'
                    name={'email'}
                    label={'email'}
                  />

                  <InputPassword
                    required
                    label={'account.passwordLabel'}
                    id={'password'}
                    name={'password'}
                  />
                  <InputPassword
                    required
                    label={'account.confirmPasswordLabel'}
                    id={'confirmPassword'}
                    name={'confirmPassword'}
                  />
                </div>
              ) : (
                <div className='ls-grid ls-grid-col-1 ls-gap_3'>
                  <InputPassword
                    required
                    autoFocus={!formRenderProps.valueGetter('password')}
                    label={'account.passwordLabel'}
                    id={'password'}
                    name={'password'}
                  />
                  <InputPassword
                    required
                    label={'account.confirmPasswordLabel'}
                    id={'confirmPassword'}
                    name={'confirmPassword'}
                  />
                </div>
              )}
              <div className='mt-16 flex justify-end gap-5'>
                <ButtonRoot
                  fillMode={'flat'}
                  icon='arrow-chevron-left'
                  className='w-40'
                  text='register.back'
                  onClick={() => {
                    handleBackRegisterOTP(VIEW_REGISTER.REGISTER_OTP);
                  }}>
                  <Localize tid='register.back' />
                </ButtonRoot>
                <ButtonRoot
                  id='confirmBtn'
                  loading={loading}
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
          )}
        />
      </div>
    </div>
  );
};
export default View;
