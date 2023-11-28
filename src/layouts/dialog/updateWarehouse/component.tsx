import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
// import { getListStore } from '@/features/common/getListStore';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DialogUpdateWarehouseProps {
  api: IApiRequest;
  apiListStore: IApiRequest;
}
export interface IPayload {
  warehouseId: string;
  storeId: string;
  name: string;
  address: string;
}

const DialogUpdateWarehouse: FunctionComponent<DialogUpdateWarehouseProps> = props => {
  const { data, onShowModal, setStatus, onSubmit } = useContext(ContextModal);

  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (response: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='consumer.updateSuccess' />);
        onShowModal();
        onSubmit && onSubmit();
        setStatus(STATUS_MODAL.SUCCESS);
        LoggerService.debug('DialogUpdateWarehouse execute handleRequestSuccess receive response', response);
      } catch (error: any) {
        LoggerService.error('DialogUpdateWarehouse execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateWarehouse execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DialogUpdateWarehouse execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmit = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      warehouseId: data.detail.warehouseId,
      storeId: data.detail.storeId,
      name: dataItem.name,
      address: dataItem.address,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);
  // const { isLoading: loadingStore, listStore } = getListStore();

  return (
    <View
      detail={data.detail}
      handleSubmit={handleSubmit}
      loading={isLoading}
      // loadingStore={loadingStore}
      // listStore={listStore}
    />
  );
};

export default DialogUpdateWarehouse;
