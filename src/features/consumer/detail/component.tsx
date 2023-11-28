import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailConsumerComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  storeId: string;
  name: string;
  phone: string;
  modifiedAt: number;
  modifiedBy: string;
}

const DetailConsumerComponent: FunctionComponent<DetailConsumerComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  const callbackFuncDetailStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('DetailConsumerComponent execute handleRequestSuccess receive data', data);
        setDetail(data);
      } catch (error: any) {
        LoggerService.error('DetailConsumerComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailConsumerComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailConsumerComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading, refetch } = useGet(
    { ...api, params: { consumerId: params?.consumerId } },
    callbackFuncDetailStore,
  );
  const handleUpdateSuccess = () => {
    refetch();
  };
  return (
    <View
      detail={detail}
      loading={isLoading}
      handleUpdate={onSetView}
      handleUpdateSuccess={handleUpdateSuccess}
    />
  );
};

export default DetailConsumerComponent;
