/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { type FunctionComponent, useEffect, useState } from 'react';

import Config from '@/Config';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IDataOCRIdCard, VIEW_REGISTER } from '../type';
import View from './view';

interface ComponentUploadLicenseAccountProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
}

const ComponentUploadLicenseAccount: FunctionComponent<ComponentUploadLicenseAccountProps> = ({
  handleBack,
  handleGetResponseSuccess,
  responseSuccess,
}) => {
  const config = new Config().getState();

  const [isShowBtn, setShowBtn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [images, setImages] = useState<any>({});
  const [response, setResponse] = useState<IDataOCRIdCard>();

  useEffect(() => {
    if (responseSuccess.dataOCRLicenseAccount) {
      setImages({
        front:
          responseSuccess.dataOCRLicenseAccount.nationalIDFront ||
          responseSuccess.dataOCRLicenseAccount.nationalIDFront,
        back:
          responseSuccess.dataOCRLicenseAccount.nationalIDBack || responseSuccess.dataOCRLicenseAccount.nationalIDBack,
      });
    }
  }, [responseSuccess]);
  const handleSubmit = () => {
    try {
      handleGetResponseSuccess({
        data: { ...response, nationalIDFront: images.front, nationalIDBack: images.back },
        view: VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT,
      });
    } catch (error: any) {
      LoggerService.error('ComponentUploadLicenseAccount execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleSkip = () => {
    try {
      handleGetResponseSuccess({
        data: null,
        view: VIEW_REGISTER.UPLOAD_LICENSE_ACCOUNT,
      });
    } catch (error: any) {
      LoggerService.error('ComponentUploadLicenseAccount execute handleGetResponseSuccess receive error', error);
    }
  };
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

  const handleOnChangeImage = async (event: any, name: string) => {
    try {
      if (!Helper.isEmpty(event.value.files)) {
        switch (name) {
          case 'nationalIDFront':
            setIsLoading(true);
            const image = await getBase64(event.value.files[0]);
            setImages({
              front: event.value.files[0],
            });

            const requestBody = {
              requestID: `${Helper.randomKey()}-web`,
              image: image.split(',').pop(),
            };

            axios
              .post(config.api.ocr.idCard, requestBody, {
                auth: {
                  username: config.ocr.username,
                  password: config.ocr.password,
                },
                headers: {
                  Authorization: config.ocr.basicAuthString,
                },
              })
              .then(response => {
                setShowBtn(false);
                setResponse(response.data.data);
                setIsLoading(false);
              })
              .catch(() => {
                toastDefault(ENUMS_TOAST.ERROR, 'Cannot extract information, retake another image ');
                setIsLoading(false);
                setShowBtn(true);
              });

            break;
          case 'nationalIDBack':
            setImages({
              ...images,
              back: event.value.files[0],
            });
            break;
          default:
            break;
        }
      }
    } catch (error: any) {
      LoggerService.error('handleOnChangeImage error', error.toString());
    }
  };

  return (
    <View
      images={images}
      isLoading={isLoading}
      isShowBtn={isShowBtn}
      handleSkip={handleSkip}
      handleOnChangeImage={handleOnChangeImage}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  );
};

export default ComponentUploadLicenseAccount;
