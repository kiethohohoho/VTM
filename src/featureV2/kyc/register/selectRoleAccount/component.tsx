/* eslint-disable @typescript-eslint/no-misused-promises */
import { type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import axios from 'axios';
import { type FunctionComponent, useState } from 'react';

import Config from '@/Config';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IDataOCRBusinessLicense, SELECT_ROLE, VIEW_REGISTER } from '../type';
import View from './view';

interface ComponentRegisterSelectRoleProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
}

const ComponentRegisterSelectRole: FunctionComponent<ComponentRegisterSelectRoleProps> = ({
  handleBack,
  handleGetResponseSuccess,
}) => {
  const config = new Config().getState();
  const [response, setResponse] = useState<IDataOCRBusinessLicense>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowBtn, setShowBtn] = useState<boolean>(true);

  const [selectRole, setSelectRole] = useState<SELECT_ROLE>(SELECT_ROLE.RETAILER);
  const getBase64 = async (file: File): Promise<string> =>
    await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
    });
  const handleOnChangeImage = async (event: any) => {
    try {
      if (!Helper.isEmpty(event.value.files)) {
        setIsLoading(true);
        const image = await getBase64(event.value.files[0]);
        const requestBody = {
          requestID: `${Helper.randomKey()}-web`,
          image: image.split(',').pop(),
        };
        axios
          .post(config.api.ocr.business_license, requestBody, {
            auth: {
              username: config.ocr.username,
              password: config.ocr.password,
            },
            headers: {
              Authorization: config.ocr.basicAuthString,
            },
          })
          .then(response => {
            console.log('Authenticated', response);
            setResponse(response.data.data);
            setIsLoading(false);
            setShowBtn(false);
          })
          .catch(error => {
            console.log('Error on Authentication', error);

            toastDefault(ENUMS_TOAST.ERROR, 'Cannot extract information, retake another image ');
            setIsLoading(false);
            setShowBtn(true);
          });
      }
    } catch (error: any) {
      LoggerService.error('ComponentRegisterSelectRole execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleOnchangeSelectRole = (event: RadioGroupChangeEvent) => {
    try {
      setSelectRole(event.value);
      setShowBtn(true);
      if (event.value === SELECT_ROLE.BRAND) {
        setShowBtn(false);
      }
    } catch (error: any) {
      LoggerService.error('ComponentRegisterSelectRole execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleSkip = () => {
    try {
      handleGetResponseSuccess({
        data: { dataOCR: null, selectRole },
        view: VIEW_REGISTER.SELECT_ROLE,
      });
    } catch (error: any) {
      LoggerService.error('ComponentUploadLicenseAccount execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleSubmit = () => {
    try {
      handleGetResponseSuccess({
        data: { dataOCR: selectRole === SELECT_ROLE.RETAILER ? response : undefined, selectRole },
        view: VIEW_REGISTER.SELECT_ROLE,
      });
    } catch (error: any) {
      LoggerService.error('ComponentUploadLicenseAccount execute handleGetResponseSuccess receive error', error);
    }
  };
  return (
    <View
      isLoading={isLoading}
      isShowBtn={isShowBtn}
      selectRole={selectRole}
      handleSkip={handleSkip}
      handleSubmit={handleSubmit}
      handleOnchangeSelectRole={handleOnchangeSelectRole}
      handleBack={handleBack}
      handleOnChangeImage={handleOnChangeImage}
    />
  );
};

export default ComponentRegisterSelectRole;
