import { useContext } from 'react';

import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IDialogUpdateStatusOrder } from '.';
import ViewDialogUpdateStatusOrder from './view';

function DialogUpdateStatusOrderComponent({ api }: IDialogUpdateStatusOrder) {
  const { data, onShowModal, setStatus, onSubmit } = useContext(ContextModal);
  const funcRequestUpdateStatusRetailer = {
    handleRequestSuccess: (data: any) => {
      try {
        onShowModal();
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='order.updateSuccess' />);
        setStatus(STATUS_MODAL.SUCCESS);
        onSubmit && onSubmit();
        LoggerService.debug('DialogUpdateOrderComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('DialogUpdateOrderComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateOrderComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('DialogUpdateOrderComponent execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestUpdateStatusRetailer);

  const handleUpdateStatusDevice = (dataItem: Record<string, any>) => {
    LoggerService.debug('DialogUpdateOrderComponent execute handleUpdateStatusDevice submit dataItem', dataItem);
    mutate({
      orderId: data.detail.orderId,
      status: dataItem.status,
    });
  };

  return (
    <ViewDialogUpdateStatusOrder
      detail={data.detail}
      loading={isLoading}
      onShowModal={onShowModal}
      handleSubmit={handleUpdateStatusDevice}
    />
  );
}

export default DialogUpdateStatusOrderComponent;
