import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { EnumPath } from '@/utils/Enums';

import { type IViewData } from '../types';

interface RequestForgotPasswordComponentProps {
  viewData?: IViewData;
  handleSubmit?: (dataItem: any) => void;
  handleNavigate: (url: string) => void;
  loading: boolean;
}

const ForgotPasswordComponent: FunctionComponent<RequestForgotPasswordComponentProps> = props => {
  const { handleNavigate, handleSubmit, loading, viewData } = props;

  return (
    <div className='flex flex-column h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='account.forgotTitle' />
      </div>
      <div
        className='pb-60 flex flex-col flex-1 justify-center items-center'
        style={{
          width: 350,
        }}>
        <Form
          onSubmit={handleSubmit}
          initialValues={{
            phoneEmail: viewData?.phone,
          }}
          render={(formRenderProps: FormRenderProps) => (
            <div className='w-full grid grid-cols-1 gap-5'>
              <InputRoot
                id='phoneEmail'
                name='phoneEmail'
                isForm
                label={'account.forgotLabel'}
              />
              <FormElement>
                <ButtonRoot
                  loading={loading}
                  themeColor='primary'
                  className='w-full'
                  disabled={!formRenderProps.valid}
                  type='submit'
                  text='account.forgotSubmitButton'>
                  <Localize tid={'account.forgotSubmitButton'} />
                </ButtonRoot>
                <ButtonRoot
                  fillMode='flat'
                  themeColor='secondary'
                  icon='arrow-chevron-left'
                  className='w-full'
                  type='submit'
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

export default ForgotPasswordComponent;
