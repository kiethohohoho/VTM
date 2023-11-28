import { type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import { type FunctionComponent, useState } from 'react';

import { LoggerService } from '@/utils/Logger';

import { SELECT_ROLE, VIEW_REGISTER } from '../type';
import View from './view';

interface ComponentRegisterSelectRoleProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
}

const ComponentRegisterSelectRole: FunctionComponent<ComponentRegisterSelectRoleProps> = ({
  handleBack,
  handleGetResponseSuccess,
}) => {
  const [selectRole, setSelectRole] = useState<SELECT_ROLE>(SELECT_ROLE.RETAILER);
  // const getBase64 = async (file: File): Promise<string> =>
  //   await new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = (e: any) => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = error => {
  //       reject(error);
  //     };
  //   });
  const handleOnChangeImage = (event: any) => {
    try {
      // handleGetResponseSuccess({ data: dataItem.selectRole, view: VIEW_REGISTER.SELECT_ROLE });
    } catch (error: any) {
      LoggerService.error('ComponentRegisterSelectRole execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleOnchangeSelectRole = (event: RadioGroupChangeEvent) => {
    try {
      setSelectRole(event.value);
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
      const resFake = {
        COMPANY_NAME: ['SHOOTINTERNATIONAL MEDIAPRODUCTION Co.Lid.', ''],
        REGISTERED_AT: ['General Department ofTaxation', ''],
        MAIN_BUSINESS_ACTIVITY: ['Filmproduction', 'សកម្មភារាអាជ័វកម្មចម្យង ផលិតខ្សែភាពយន្ត'],
        FORM_OF_BUSINESS: ['Privatelimited company', ''],
        OWNER_NAME: ['Cambodian', ''],
        NATIONALITY: ['', '| សញ្ជាតរខ្មែរ'],
        TAX_NUMBER: ['K002-109001729', 'K002-109001729'],
        HEADER: ['PATENT TAX2022', ''],
        UNDER: ['ChamkarMonTaxBranch', 'ចះបញ់ំនៅ អគ្គនាយកដ្ឋាខពន្ធដារ សួតនៅក្រោមការគុបគ្រង សាខាពន្ធដារខណ្ឌចការមន'],
        REPRESENTED_BY: ['', ''],
        ADDRESS: ['', ''],
      };
      handleGetResponseSuccess({
        data: { dataOCR: selectRole === SELECT_ROLE.RETAILER ? resFake : undefined, selectRole },
        view: VIEW_REGISTER.SELECT_ROLE,
      });
    } catch (error: any) {
      LoggerService.error('ComponentUploadLicenseAccount execute handleGetResponseSuccess receive error', error);
    }
  };
  return (
    <View
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
