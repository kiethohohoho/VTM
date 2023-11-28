import { useContext, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import { type IFilter } from '@/core2/table/request';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { From, Limit, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IFormCreateGroup } from '../types';
import { ViewGroup } from './view';

interface IComponentGroup {
  apiListGroup: IApiRequest;
  apiCreateGroup: IApiRequest;
  onRequestSuccessListGroup?: (data: any) => void;
}
const payload: IFilter = {
  order: 'createdAt',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ComponentGroup = (props: IComponentGroup) => {
  const { apiListGroup, apiCreateGroup, onRequestSuccessListGroup } = props;
  const { onSetView } = useContext(ContextModal);

  const [key, setKey] = useState<string>('');
  const funcRequestCreateGroup = {
    handleRequestSuccess: (data: any) => {
      try {
        setKey(Helper.randomKey());
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='groupStaff.createSuccess' />);
      } catch (error) {}
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
  const { isLoading, mutate } = useRequest(apiCreateGroup, funcRequestCreateGroup);
  const handleSubmitCreateGroup = (data: IFormCreateGroup) => {
    mutate({
      name: data.name,
    });
  };
  return (
    <ViewGroup
      setKey={setKey}
      onSetView={onSetView}
      onRequestSuccessListGroup={onRequestSuccessListGroup}
      isLoading={isLoading}
      handleSubmitCreateGroup={handleSubmitCreateGroup}
      key={key}
      apiListGroup={apiListGroup}
      payload={payload}
    />
  );
};

export { ComponentGroup };
