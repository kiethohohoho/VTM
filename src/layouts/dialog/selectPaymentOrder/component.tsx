import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DialogSelectPaymentComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  userId: string;
  name: string;
  status: any;
}

const DialogSelectPaymentComponent: FunctionComponent<DialogSelectPaymentComponentProps> = props => {
  const { data, onShowModal, onSubmit, setStatus } = useContext(ContextModal);
  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='payment.updateSuccess' />);
        onShowModal();
        setStatus(STATUS_MODAL.SUCCESS);
        onSubmit && onSubmit();

        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };

  const handleSubmit = (dataItem: any) => {
    const payload = {
      orderGroupId: data.orderGroupId,
      amountReceived: Number(data.amountReceived),
      paymentMethod: dataItem.paymentMethod.id,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);

  return (
    <View
      detail={data.detail}
      handleSubmit={handleSubmit}
      loading={isLoading}
    />
  );
};

export default DialogSelectPaymentComponent;
