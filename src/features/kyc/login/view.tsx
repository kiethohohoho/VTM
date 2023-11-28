import './_index.scss';

import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputPassword, InputRoot } from '@/core2/input';
import { ScreenLoader } from '@/core2/loader';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { EnumPath } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { VIEW_LOGIN } from './login.interface';
import { SelectRole } from './selectRole';
import { SelectStore } from './selectStore';
import { type IStore } from './selectStore/view';
import { SendOtp } from './sendOTP';

interface ILoginViewProps {
  isLoading: boolean;
  view: VIEW_LOGIN;
  otpKey: string;
  phoneNumber: string;
  selectRoleToken?: string;
  selectStoreToken?: string;
  listStore?: IStore[];
  handleSubmit: (values: Record<string, any>, event?: SyntheticEvent<any, Event> | undefined) => void;
  handleBack: (step: VIEW_LOGIN) => void;
  handleChangeView: (step: VIEW_LOGIN) => void;
  handleSetSelectRoleToken: (token: string) => void;
  handleSetSelectStoreToken: (token: string) => void;
  handleSetListStore: (listStore: IStore[]) => void;
}

const View = (props: ILoginViewProps) => {
  const {
    isLoading,
    view,
    otpKey,
    phoneNumber,
    selectRoleToken,
    selectStoreToken,
    listStore = [],
    handleBack,
    handleSubmit,
    handleChangeView,
    handleSetSelectRoleToken,
    handleSetSelectStoreToken,
    handleSetListStore,
  } = props;
  const navigate = useNavigate();
  const renderView: any = {
    [VIEW_LOGIN.LOGIN]: (
      <>
        <div className='flex flex-column justify-between h-full items-center'>
          <div className='text-center pt-8'>
            <LayoutAuthTitle
              title='account.loginTitle'
              description='account.loginDescription'
            />
          </div>
          <div
            className='pb-28'
            style={{
              width: 350,
            }}>
            <Form
              onSubmit={handleSubmit}
              validator={(values: any) =>
                ValidatorComponent({
                  values,
                  validators: {
                    username: [VALIDATOR.EMPTY],
                    password: [VALIDATOR.EMPTY],
                  },
                })
              }
              render={(formRenderProps: FormRenderProps) => {
                return (
                  <FormElement>
                    <div className='flex flex-column gap-5'>
                      <InputRoot
                        helperText='Warning'
                        name={'username'}
                        label={'account.loginUsernameLabel'}
                      />
                      <InputPassword
                        name={'password'}
                        label={'account.passwordLabel'}
                      />
                    </div>
                    <div className='flex flex-column gap-5 mt-5'>
                      <a
                        className='text-end text-neutral-70 cursor-pointer'
                        onClick={() => {
                          navigate(EnumPath.FORGOT_PASSWORD);
                        }}>
                        <Localize tid={'account.forgotButton'} />
                      </a>
                      <ButtonRoot
                        loading={isLoading}
                        themeColor={'primary'}
                        size={'large'}
                        disabled={!formRenderProps.valid}
                        type='submit'
                        text='account.loginButton'
                      />
                    </div>
                  </FormElement>
                );
              }}
            />
          </div>
          <div className='p-16'>
            <Localize tid='account.notHaveAccount' />
            <span
              onClick={() => {
                navigate(EnumPath.REGISTER);
              }}
              className='px-2 text-primary font-bold cursor-pointer'>
              <Localize tid='account.register.here' />
            </span>
          </div>
        </div>

        {isLoading && <ScreenLoader />}
      </>
    ),
    [VIEW_LOGIN.SEND_OTP]: (
      <SendOtp
        otpKey={otpKey}
        phoneNumber={phoneNumber}
        handleBack={handleBack}
        handleChangeView={handleChangeView}
        handleSetSelectRoleToken={handleSetSelectRoleToken}
      />
    ),
    [VIEW_LOGIN.SELECT_ROLE]: (
      <SelectRole
        token={selectRoleToken}
        handleChangeView={handleChangeView}
        handleSetSelectStoreToken={handleSetSelectStoreToken}
        handleSetListStore={handleSetListStore}
      />
    ),
    [VIEW_LOGIN.SELECT_STORE]: (
      <SelectStore
        listStore={listStore}
        token={selectStoreToken}
        handleChangeView={handleChangeView}></SelectStore>
    ),
  };
  return renderView[view];
};
export default View;
