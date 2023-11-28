import { useContext } from 'react';

import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IDialogUpdateOrder } from '.';
import ViewDialogUpdateOrder from './view';

function DialogOrderAddConsumerComponent({ api }: IDialogUpdateOrder) {
  const { onShowModal, setStatus, onSetView } = useContext(ContextModal);
  const funcRequestAddConsumer = {
    handleRequestSuccess: (data: any) => {
      try {
        onShowModal();
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='order.createConsumerSuccess' />);
        setStatus(STATUS_MODAL.SUCCESS);
        onSetView({
          typeDialog: TYPE_DIALOG.CONFIRM,
          typeModel: TYPE_MODAL.CUSTOM,
          data: { consumerId: data.consumerId },
        });
        LoggerService.debug('DialogOrderAddConsumerComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('DialogOrderAddConsumerComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogOrderAddConsumerComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('DialogOrderAddConsumerComponent execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestAddConsumer);

  const handleUpdateStatusDevice = (dataItem: Record<string, any>) => {
    LoggerService.debug('DialogOrderAddConsumerComponent execute handleUpdateStatusDevice submit dataItem', dataItem);
    const payload = {
      phone: dataItem.phone,
      name: dataItem.name,
    };
    mutate(payload);
  };

  return (
    <ViewDialogUpdateOrder
      loading={isLoading}
      onShowModal={onShowModal}
      handleSubmit={handleUpdateStatusDevice}
    />
  );
}

export default DialogOrderAddConsumerComponent;
