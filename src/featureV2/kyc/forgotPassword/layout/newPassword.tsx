import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputPassword } from '@/core2/input';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { EnumPath } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';
interface Props {
  viewData?: any;
  handleSubmitNewPassword?: (dataItem: any) => void;
  handleNavigate: (url: string) => void;
  loading: boolean;
}

const NewPasswordComponent: FunctionComponent<Props> = props => {
  const { handleSubmitNewPassword, handleNavigate, loading } = props;

  return (
    <div className='flex flex-column justify-between h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='account.forgotNewPasswordTitle' />
      </div>
      <div
        className='pb-80'
        style={{
          width: 350,
        }}>
        <Form
          validator={(values: any) =>
            ValidatorComponent({
              values,
              validators: {
                password: [VALIDATOR.EMPTY],
                confirmPassword: [VALIDATOR.EMPTY],
              },
            })
          }
          onSubmit={handleSubmitNewPassword}
          render={(formRenderProps: FormRenderProps) => (
            <div className='w-full grid grid-cols-1 gap-5'>
              <InputPassword
                label={'account.passwordLabel'}
                id={'password'}
                name={'password'}
                key={'password'}
              />
              <InputPassword
                label={'account.confirmPasswordLabel'}
                id={'confirmPassword'}
                name={'confirmPassword'}
                key={'confirmPassword'}
              />
              <FormElement>
                <ButtonRoot
                  loading={loading}
                  themeColor='primary'
                  className='w-full'
                  disabled={!formRenderProps.valid}
                  type='submit'
                  text='account.forgotConfirm'>
                  <Localize tid={'account.forgotConfirm'} />
                </ButtonRoot>
                <ButtonRoot
                  fillMode='flat'
                  themeColor='secondary'
                  icon='arrow-chevron-left'
                  className='w-full'
                  text='account.forgotBackButton'
                  onClick={() => {
                    handleNavigate(EnumPath.LOGIN);
                  }}
                />
              </FormElement>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default NewPasswordComponent;
