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

interface CreateCategoryComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  storeId: string;
  name: string;
}

const CreateCategoryComponent: FunctionComponent<CreateCategoryComponentProps> = props => {
  const navigate = useNavigate();

  const { api } = props;
  const callbackFuncCategory = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='category.createSuccess' />);
        navigate(EnumPath.CATEGORY_IN_STORE);
        LoggerService.debug('CreateCategoryComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('CreateCategoryComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('CreateCategoryComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('CreateCategoryComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmitCreateCategroy = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      storeId: dataItem.store?.id || listStore[0].id,
      name: dataItem.name,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFuncCategory);
  const { listStore } = getListStore();
  return (
    <View
      handleSubmit={handleSubmitCreateCategroy}
      loading={isLoading}
      listStore={listStore}
    />
  );
};

export default CreateCategoryComponent;
