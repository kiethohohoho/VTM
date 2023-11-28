import { message } from 'antd';
import { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useLogin } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_VTM } from '../type';
import RegisterLicenseView from './view';

interface RegisterLicenseComponentProps {
  handleBack?: (step: VIEW_REGISTER_VTM) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiCheckLicenseExist: IApiRequest;
  loading?: boolean;
}

const RegisterLicenseComponent = ({
  handleGetResponseSuccess,
  responseSuccess,
  apiCheckLicenseExist,
}: RegisterLicenseComponentProps) => {
  const [dataForm, setDataForm] = useState<any>(null);
  const funcRequestCheckLicenseExist = {
    handleRequestLicenseSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({
          data: { data, ...dataForm },
          view: VIEW_REGISTER_VTM.INFO_ACCOUNT,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleRequestSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({
          data: { data },
          view: VIEW_REGISTER_VTM.REGISTER_OTP,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },

    handleRequestLicenseHaveData: (data: any) => {
      try {
        handleGetResponseSuccess({
          data: { data },
          view: VIEW_REGISTER_VTM.REGISTER_ACCOUNT,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleLicenseExist: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'license.exits'} />);
        message.error('license exists');
      } catch (error: any) {
        LoggerService.error('License is error', error);
      }
    },
  };

  const handleSubmit = (data: any) => {
    try {
      setDataForm(data);
      const payload = {
        license: data?.license,
        typeNumber: Number(data?.licenseType?.key ? data?.licenseType?.key : data?.licenseType),
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('License execute handleGetResponseSuccess receive error', error);
    }
  };

  const { mutate, isLoading } = useLogin(apiCheckLicenseExist, funcRequestCheckLicenseExist);
  return (
    <RegisterLicenseView
      loading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterLicenseComponent;
