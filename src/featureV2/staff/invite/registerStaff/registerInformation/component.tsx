import { type FC } from 'react';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import DeviceService from '@/utils/Device';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import {
  type IFormValueRegisterInformationStaff,
  type IRegisterInformationPropsStaff,
  VIEW_REGISTER_STAFF,
} from '../register.interface';
import View from './view';

const RegisterInformationStaffComponent: FC<IRegisterInformationPropsStaff> = ({
  api,
  handleGetResponseSuccess,
  responseSuccess,
  handleBack,
}) => {
  const funcRequestRegisterInfoStaff = {
    handleRequestSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER_STAFF.REGISTER });
        LoggerService.debug('RegisterInformationStaffComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('RegisterInformationStaffComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPlimited'} />);
      } catch (error: any) {
        LoggerService.error('RegisterInformationStaffComponent execute handleRequestOTPLimited receive error', error);
      }
    },
    handleRequestOTPExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPExpired'} />);
      } catch (error: any) {
        LoggerService.error('RegisterInformationStaffComponent execute handleRequestOTPExpired receive error', error);
      }
    },
    handleRequestOTPNotMatch: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPNotMatch'} />);
      } catch (error: any) {
        LoggerService.error('RegisterInformationStaffComponent execute handleRequestOTPNotMatch receive error', error);
      }
    },
    handleRequestOTPWrongManyTime: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPWrongManyTime'} />);
      } catch (error: any) {
        LoggerService.error(
          'RegisterInformationStaffComponent execute handleRequestOTPWrongManyTime receive error',
          error,
        );
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestRegisterInfoStaff);

  const handleSubmit = (dataItem: Record<string, IFormValueRegisterInformationStaff>) => {
    Helper.hashPassword(dataItem.password).then(password => {
      const payload = {
        token: responseSuccess.responseSuccessSendOTP.token,
        password,
        device: DeviceService.getDevice(),
      };
      mutate(payload);
    });
  };

  return (
    <View
      handleSubmit={handleSubmit}
      loading={isLoading}
      handleBack={handleBack}
    />
  );
};

export default RegisterInformationStaffComponent;
