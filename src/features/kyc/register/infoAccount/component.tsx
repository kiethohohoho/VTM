import { type FunctionComponent } from 'react';

import { LoggerService } from '@/utils/Logger';

import { type IFormValueInfoAccountComponent, type IResponseComponentInfoAccount, VIEW_REGISTER } from '../type';
import View from './view';
interface IComponentInfoAccountProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
  responseSuccess: IResponseComponentInfoAccount;
}

const ComponentInfoAccount: FunctionComponent<IComponentInfoAccountProps> = ({
  handleBack,
  handleGetResponseSuccess,
  responseSuccess,
}) => {
  const handleSubmit = (dataItem: IFormValueInfoAccountComponent) => {
    try {
      console.log('dataItem', dataItem);
      handleGetResponseSuccess({
        data: dataItem,
        view: VIEW_REGISTER.INFO_ACCOUNT,
      });
    } catch (error: any) {
      LoggerService.error('ComponentInfoAccount execute handleGetResponseSuccess receive error', error);
    }
  };
  return (
    <View
      responseSuccess={responseSuccess}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  );
};

export default ComponentInfoAccount;
