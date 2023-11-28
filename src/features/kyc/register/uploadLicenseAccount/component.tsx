/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { type FunctionComponent, useEffect, useState } from 'react';

import Config from '@/Config';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumGenderKhmer } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IDataOCRIdCard, VIEW_REGISTER } from '../type';
import View from './view';

interface ComponentUploadLicenseAccountProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
}

const ComponentUploadLicenseAccount: FunctionComponent<ComponentUploadLicenseAccountProps> = ({
  handleBack,
  handleGetResponseSuccess,
}) => {
  const config = new Config().getState();

  const [isShowBtn, setShowBtn] = useState<boolean>(true);
  const [images, setImages] = useState<any>({});
  const [response, setResponse] = useState<IDataOCRIdCard>({
    khm_name: '\f',
    height: '១៧៥ ស.ម',
    place_of_birth: 'ឃុំពេជសារ ស្រុកកោះអណ្តែត តាកែវ',
    address: '2ឃុំពេជសារ ស្រុកកោះអណ្តែត តាកែវ',
    identifying_characteristics: '_ សិលាកតូចចំ ០,៥សម ព្រោយក្រោមចុងចិញ្ចើមឆ្វេង',
    card_id: '101105287',
    eng_name: 'TIT SAMOL',
    birth_date: '១២.០៩.១៩៨៤',
    resign_date: '១៥.០៩.២០១៥',
    expiry_date: '១២.០៩.២០២៥',
    sex: EnumGenderKhmer.MALE,
  });
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
            const image = await getBase64(event.value.files[0]);
            setImages({
              front: event.value.files[0],
            });

            const requestBody = {
              requestID: Helper.randomKey(),
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
                console.log('Authenticated', response);
                setResponse(response.data);
              })
              .catch(error => {
                toastDefault(ENUMS_TOAST.ERROR, error);
                console.log('Error on Authentication', error);
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
  useEffect(() => {
    if (images.back && images.front) {
      setShowBtn(false);
    }
  }, [images]);
  return (
    <View
      isShowBtn={isShowBtn}
      handleSkip={handleSkip}
      handleOnChangeImage={handleOnChangeImage}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  );
};

export default ComponentUploadLicenseAccount;
