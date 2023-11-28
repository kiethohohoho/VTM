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

interface CreateGroupStaffComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  storeId: string;
  name: string;
}

const CreateGroupStaffComponent: FunctionComponent<CreateGroupStaffComponentProps> = props => {
  const navigate = useNavigate();

  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='store.createSuccess' />);
        navigate(EnumPath.GROUP_STAFF);
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleDuplicateName: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid='groupStaff.createDuplicate' />);

        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmit = (dataItem: Record<string, any>) => {
    const storeId = listStore[0].id as string;
    const payload: IPayload = {
      name: dataItem.name,
      storeId,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);
  const { isLoading: loadingStore, listStore } = getListStore();

  return (
    <View
      handleSubmit={handleSubmit}
      loading={isLoading}
      loadingStore={loadingStore}
      listStore={listStore}
    />
  );
};

export default CreateGroupStaffComponent;
