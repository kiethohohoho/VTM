import { type FunctionComponent, useContext } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DialogUpdateCategoryProps {
  api: IApiRequest;
}
export interface IPayload {
  categoryInStoreId: string;
  name: string;
}

const DialogUpdateCategory: FunctionComponent<DialogUpdateCategoryProps> = props => {
  const { data, onShowModal, onSubmit } = useContext(ContextModal);

  const { api } = props;
  const callbackUpdateConsumer = {
    handleRequestSuccess: (response: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='category.updateSuccess' />);
        onShowModal();
        onSubmit && onSubmit();
        LoggerService.debug('DialogUpdateCategory execute handleRequestSuccess receive response', response);
      } catch (error: any) {
        LoggerService.error('DialogUpdateCategory execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogUpdateCategory execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DialogUpdateCategory execute handleRequestError receive error', error);
      }
    },
  };

  const handleSubmit = (dataItem: Record<string, string>) => {
    const payload: IPayload = {
      categoryInStoreId: data.detail.categoryInStoreId,
      name: dataItem.name,
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

export default DialogUpdateCategory;
