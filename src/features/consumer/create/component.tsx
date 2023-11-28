import { type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { getListStore } from '@/features/common/getListStore';
import { EnumPath } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface CreateConsumerComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  storeId: string;
  name: string;
  phone: string;
}

const CreateConsumerComponent: FunctionComponent<CreateConsumerComponentProps> = props => {
  const navigate = useNavigate();

  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='consumer.createSuccess' />);
        navigate(EnumPath.CONSUMER);
        LoggerService.debug('CreateConsumerComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('CreateConsumerComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('CreateConsumerComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('CreateConsumerComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmitCreateConsumer = (dataItem: Record<string, any>) => {
    const storeId = listStore[0].id as string;
    const payload: IPayload = {
      storeId,
      name: dataItem.name,
      phone: dataItem.phone,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);
  const { isLoading: loadingStore, listStore } = getListStore();

  return (
    <View
      handleSubmit={handleSubmitCreateConsumer}
      loading={isLoading}
      loadingStore={loadingStore}
      listStore={listStore}
    />
  );
};

export default CreateConsumerComponent;
