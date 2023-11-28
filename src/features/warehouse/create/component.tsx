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

interface CreateWarehouseComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  storeId: string;
  name: string;
  address: string;
}

const CreateWarehouseComponent: FunctionComponent<CreateWarehouseComponentProps> = props => {
  const navigate = useNavigate();

  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='store.createSuccess' />);
        navigate(EnumPath.WAREHOUSE);
        LoggerService.debug('CreateWarehouseComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('CreateWarehouseComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('CreateWarehouseComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('CreateWarehouseComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmitCreateWarehouse = (dataItem: Record<string, any>) => {
    const storeId = listStore[0].id as string;
    const payload: IPayload = {
      storeId,
      name: dataItem.name,
      address: dataItem.address,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);
  const { isLoading: loadingStore, listStore } = getListStore();

  return (
    <View
      handleSubmit={handleSubmitCreateWarehouse}
      loading={isLoading}
      loadingStore={loadingStore}
      listStore={listStore}
    />
  );
};

export default CreateWarehouseComponent;
