/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
import { message } from 'antd';
import { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_VTM } from '../type';
import RegisterAccountView from './view';

interface RegisterAccountComponentProps {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiRegisterUpdate: IApiRequest;
  apiRegisterUpdateHaveData: IApiRequest;
}

const RegisterAccountComponent = ({
  apiRegisterUpdate,
  handleGetResponseSuccess,
  responseSuccess,
  apiRegisterUpdateHaveData,
}: RegisterAccountComponentProps) => {
  // const [userName, setUserName] = useState<any>('');
  const [data, setData] = useState<any>(null);
  const apiCheckUserNameExist: IApiRequest = {
    method: 'get',
    url: `https://api-vtm.intelin.vn/public/register/username/${data?.username}`,
    headers: {},
  };
  const handleChangeInputUserName = (e: string) => {
    setData({ ...data, username: e });
  };
  const funcHandleRegisterUpdate = {
    handleUpdateSuccess: (res: any) => {
      try {
        handleGetResponseSuccess({
          data,
          view: VIEW_REGISTER_VTM.REGISTER_SUCCESS,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleRequestLicenseUpdate: () => {
      try {
        handleGetResponseSuccess({
          data,
          view: VIEW_REGISTER_VTM.REGISTER_SUCCESS,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleRequestLicenseApprove: () => {
      try {
        handleGetResponseSuccess({
          data,
          view: VIEW_REGISTER_VTM.REGISTER_SUCCESS,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleUpdateFailed: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'update.false'} />);
      } catch (error: any) {
        LoggerService.error('Update user is false', error);
      }
    },
    handleRequestLicenseHaveData: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'username.exits'} />);
      } catch (error: any) {
        LoggerService.error('Username is exist', error);
      }
    },
  };

  const funcUserNameRegister = {
    handleUserNameSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({
          data: data?.username,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleUserNameExist: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'username.exits'} />);
      } catch (error: any) {
        LoggerService.error('Username is exist', error);
      }
    },
  };
  const checkExist = async (username: any) => {
    try {
      await mutateUserName({});
    } catch (error: any) {
      message.error('error', error?.messages);
    }
  };

  console.log('qqqq', responseSuccess);
  const handleSubmit = async (data: any) => {
    if (responseSuccess?.responseAccount?.data || responseSuccess?.responseAccount?.ref) {
      try {
        const payload = {
          username: data?.username.toLowerCase(),
          password: await Helper.hashPasswordMD5(data?.password),
          ref: responseSuccess?.responseAccount?.data || responseSuccess?.responseAccount?.ref,
        };
        await checkExist(payload?.username);
        setData(payload);
        await mutate(payload);
      } catch (error: any) {
        LoggerService.error('handleSubmit receive error', error);
      }
    } else {
      try {
        const payload = {
          username: data?.username.toLowerCase(),
          password: await Helper.hashPasswordMD5(data?.password),
          ref: responseSuccess?.responseInfor?.ref || responseSuccess?.responseInfor?.data?.ref,
        };
        await checkExist(payload?.username);
        setData(payload);
        await mutateAsync(payload);
      } catch (error: any) {
        LoggerService.error('handleSubmit receive error', error);
      }
    }
  };

  const { mutateAsync } = useRequest(apiRegisterUpdate, funcHandleRegisterUpdate);
  const { mutate } = useRequest(apiRegisterUpdateHaveData, funcHandleRegisterUpdate);
  const { mutateAsync: mutateUserName } = useRequest(apiCheckUserNameExist, funcUserNameRegister);
  return (
    <RegisterAccountView
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleSubmit={handleSubmit}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      handleChangeInputUserName={handleChangeInputUserName}
    />
  );
};

export default RegisterAccountComponent;
