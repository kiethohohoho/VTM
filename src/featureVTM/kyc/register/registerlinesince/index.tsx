import { type Rule } from 'antd/es/form';

import { type IApiRequest } from '@/api/api.interface';

import { type IIndexOfViewVTM } from '../type';
// import Config from '@/Config';
import RegisterLicenseComponent from './component';

// const config = new Config().getState();
interface ValidationRuleOptions {
  selectedOptionValue: number;
  requiedFormInfor: {
    CMND: string;
    CCCD: string;
    Passport: string;
    // Add other types if needed
  };
}
type ValidationResult = Rule[];
export const getValidationRule = ({
  selectedOptionValue,
  requiedFormInfor,
}: ValidationRuleOptions): ValidationResult => {
  switch (selectedOptionValue) {
    case 0: // CMND
      return [
        {
          required: true,
          message: requiedFormInfor.CMND,
        },
        {
          pattern: /^\d{9}$/,
          message: 'Chứng minh nhân dân phải có đúng 9 số',
        },
      ];
    case 1: // CCCD
      return [
        {
          required: true,
          message: requiedFormInfor.CCCD,
        },
        {
          pattern: /^\d{11}$/,
          message: 'Căn cước công dân phải có đúng 11 số',
        },
      ];
    case 2: // Passport
      return [
        {
          required: true,
          message: requiedFormInfor.Passport,
        },
        // Add additional rules for Passport if needed
      ];
    default:
      return []; // Add default rules if needed
  }
};
const IndexRegisterLicense = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewVTM) => {
  const apiCheckLicenseExist: IApiRequest = {
    method: 'put',
    //   url: config.api.vtmUser.kyc.register,
    url: 'https://api-vtm.intelin.vn/public/register/exist',
    headers: {},
  };

  return (
    <RegisterLicenseComponent
      apiCheckLicenseExist={apiCheckLicenseExist}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexRegisterLicense;
