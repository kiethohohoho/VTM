import { useContext } from 'react';

import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IDialogUpdateStatusOrder } from '.';
import ViewDialogUpdateStatusOrder from './view';

function DialogUpdateStatusOrderO2OComponent({ api }: IDialogUpdateStatusOrder) {
  const { data, onShowModal, setStatus, onSubmit } = useContext(ContextModal);
  console.log('DialogUpdateStatusOrderO2OComponent check data', data);
  const funcRequestUpdateStatusOrderO2O = {
    handleRequestSuccess: (data: any) => {
      try {
        onShowModal();
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='order.updateSuccess' />);
        setStatus(STATUS_MODAL.SUCCESS);
        onSubmit && onSubmit();
        LoggerService.debug('DialogUpdateStatusOrderO2OComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('DialogUpdateStatusOrderO2OComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateStatusOrderO2OComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('DialogUpdateStatusOrderO2OComponent execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestUpdateStatusOrderO2O);

  const handleUpdateStatusOrderO2O = (dataItem: Record<string, any>) => {
    LoggerService.debug(
      'DialogUpdateStatusOrderO2OComponent execute handleUpdateStatusOrderO2O submit dataItem',
      dataItem,
    );
    mutate({
      storeId: data.storeId,
      orderId: data.order.orderId,
      status: Number(dataItem.status),
    });
  };

  return (
    <ViewDialogUpdateStatusOrder
      detail={data}
      loading={isLoading}
      onShowModal={onShowModal}
      handleSubmit={handleUpdateStatusOrderO2O}
    />
  );
}

export default DialogUpdateStatusOrderO2OComponent;
