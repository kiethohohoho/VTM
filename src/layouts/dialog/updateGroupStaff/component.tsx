import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DialogUpdateGroupStaffProps {
  api: IApiRequest;
}
export interface IPayload {
  groupStaffId: string;
  name: string;
}

const DialogUpdateGroupStaff: FunctionComponent<DialogUpdateGroupStaffProps> = props => {
  const { data, onShowModal, onSubmit } = useContext(ContextModal);
  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='groupStaff.updateSuccess' />);
        onShowModal();
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

  const handleSubmit = (dataItem: Record<string, string>) => {
    const payload: IPayload = {
      groupStaffId: data.detail.groupStaffId,
      name: dataItem.name,
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

export default DialogUpdateGroupStaff;
