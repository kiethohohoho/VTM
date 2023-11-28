import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DialogUpdateConsumerProps {
  api: IApiRequest;
}
export interface IPayload {
  consumerId: string;
  name: string;
  phone: string;
}

const DialogUpdateConsumer: FunctionComponent<DialogUpdateConsumerProps> = props => {
  const { data, onShowModal, setStatus, onSubmit } = useContext(ContextModal);

  const { api } = props;
  const callbackUpdateConsumer = {
    handleRequestSuccess: (response: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='consumer.updateSuccess' />);
        onShowModal();
        onSubmit && onSubmit();
        setStatus(STATUS_MODAL.SUCCESS);
        LoggerService.debug('DialogUpdateConsumer execute handleRequestSuccess receive response', response);
      } catch (error: any) {
        LoggerService.error('DialogUpdateConsumer execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateConsumer execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DialogUpdateConsumer execute handleRequestError receive error', error);
      }
    },
  };

  const handleSubmit = (dataItem: Record<string, string>) => {
    const payload: IPayload = {
      consumerId: data.detail.consumerId,
      name: dataItem.name,
      phone: dataItem.phone,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackUpdateConsumer);

  return (
    <View
      detail={data.detail}
      handleSubmit={handleSubmit}
      loading={isLoading}
    />
  );
};

export default DialogUpdateConsumer;
