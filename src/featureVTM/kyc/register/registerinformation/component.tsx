import { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRegister } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_VTM } from '../type';
import RegisterInformationView from './view';
/* eslint-disable*/
interface RegisterInformationComponentProps {
  handleBack: (step: VIEW_REGISTER_VTM) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiRegister: IApiRequest;

}

const RegisterInformationComponent = ({
  handleGetResponseSuccess,
  responseSuccess,
  handleBack,
  apiRegister,
}: RegisterInformationComponentProps) => {

  const [data, setData] = useState<any>(null);
  const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const isShowExpriday = (responseSuccess: any)=>{
    console.log("responseSuccess", responseSuccess?.responseLicense?.data?.licenseType?.key)
      if(responseSuccess?.responseLicense?.data?.licenseType?.key == 0){
       return false
      }else{
        return true
      }
      
  } 
  const apiCheckPhoneExist: IApiRequest = {
    method: 'get',
    url: `https://api-vtm.intelin.vn/public/register/phone/${data?.phone}`,
    headers: {},
  }
  const apiCheckEmailExist: IApiRequest = {
    method: 'get',
    url: `https://api-vtm.intelin.vn/public/register/email/${data?.email}`,
    headers: {},
  }

  const handleChangeInputPhone = (e: string) => {
    setData({ ...data, phone: e })
  }

  const handleChangeInputEmail = (e: string) => {
    setData({ ...data, email: e })
  }

  const funcHandleRegister = {
    handleRequestSuccess: (res: any) => {
      try {
        handleGetResponseSuccess({
          data: res,
          view: VIEW_REGISTER_VTM.REGISTER_OTP,
        });
      } catch (error: any) {

        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleEmailExist: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'email.exits'} />);
        setIsErrorPhone(true);
      } catch (error: any) {
        LoggerService.error('Phone is Error', error);
      }
    },
    handlePhoneExist: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'phone.exits'} />);
        setIsErrorEmail(true)
      } catch (error: any) {
        LoggerService.error('Phone is Error', error);
      }
    },
  };

  const funcEmailRegister = {
    handleEmailSuccess: () => {
      try {
        handleGetResponseSuccess({
          // data: { data },
          data: data?.email
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
  }

  const funcPhoneRegister = {
    handlePhoneSuccess: () => {
      try {
        handleGetResponseSuccess({
          data: data?.phone,
        });
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
  }

  const checkExist = async (phone: any, email: any) => {
    try {
      await Promise.all([
        phone ? mutatePhone(phone) : Promise.resolve(),
        email ? mutateEmail(email) : Promise.resolve(),
      ]);
    }
    catch (error: any) {
      LoggerService.error('Register execute handleGetResponseSuccess receive error', error);
    }
  }


  const handleSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        nationality: data?.nationality?.key,
        licenseType: Number(data?.licenseType?.key),
        sex: Number(data?.sex?.key),
        language: 0,
        inviteCode: data?.inviteCode,
        isRegCard: data?.isRegCard ? 1 : 0,
        dob: new Date(data?.dob).getTime(),
        licenseDate: new Date(data?.licenseDate).getTime(),
      };
      await checkExist(payload?.phone, payload?.email);
      setData(payload);
      await mutateAsync(payload);

    }
    catch (error: any) {
      LoggerService.error('Register execute handleGetResponseSuccess receive error', error.messages);

    }
  };
  const { mutateAsync, isError: errorSubmit } = useRegister(apiRegister, funcHandleRegister);
  const { mutate: mutatePhone, isError: errorEmail } = useRegister(apiCheckPhoneExist, funcPhoneRegister);
  const { mutateAsync: mutateEmail, isError } = useRegister(apiCheckEmailExist, funcEmailRegister);

  return (
    <RegisterInformationView
      isShow={isShowExpriday(responseSuccess)}
      isErrorPhone={isErrorPhone}
      isErrorEmail={isErrorEmail}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
      handleChangeInputPhone={handleChangeInputPhone}
      handleChangeInputEmail={handleChangeInputEmail}

    />
  );
};

export default RegisterInformationComponent;
