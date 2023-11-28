import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

import { useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IDialogUpdateStatusDevice } from '.';
import ViewUpdateStatusDevice from './view';
const config = new Config().getState();

function DialogUpdateStatusDevice({ api }: IDialogUpdateStatusDevice) {
  const { data, onShowModal, setStatus } = useContext(ContextModal);
  const queryClient = useQueryClient();
  const funcRequestUpdateStatusRetailer = {
    handleRequestSuccess: (data: any) => {
      try {
        onShowModal();
        queryClient.invalidateQueries(['get', config.api.lsUser.device]);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='device.updateSuccess' />);
        setStatus(STATUS_MODAL.SUCCESS);
        LoggerService.debug('DialogUpdateStatusDevice execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('DialogUpdateStatusDevice execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateStatusDevice execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('DialogUpdateStatusDevice execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestUpdateStatusRetailer);

  const handleUpdateStatusDevice = (dataItem: Record<string, any>) => {
    LoggerService.debug('DialogUpdateStatusDevice execute handleUpdateStatusDevice submit dataItem', dataItem);
    Helper.hashPassword(dataItem.password).then(password => {
      mutate({
        deviceId: data.detail.deviceId,
        status: dataItem.status,
        password,
      });
    });
  };

  return (
    <ViewUpdateStatusDevice
      detail={data.detail}
      loading={isLoading}
      onShowModal={onShowModal}
      handleSubmit={handleUpdateStatusDevice}
    />
  );
}

export default DialogUpdateStatusDevice;
