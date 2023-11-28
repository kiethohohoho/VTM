import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { LoggerService } from '@/utils/Logger';

import { type IResponseDetail } from './types';
import { ViewDetailConsumer } from './view';

interface IComponentDetailConsumer {
  api: IApiRequest;
}
const ComponentDetailConsumer: FunctionComponent<IComponentDetailConsumer> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  const callbackFuncDetailStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('ComponentDetailConsumer execute handleRequestSuccess receive data', data);
        setDetail(data);
      } catch (error: any) {
        LoggerService.error('ComponentDetailConsumer execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDetailConsumer execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('ComponentDetailConsumer execute handleRequestError receive error', error);
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
    <ViewDetailConsumer
      detail={detail}
      loading={isLoading}
      handleUpdate={onSetView}
      handleUpdateSuccess={handleUpdateSuccess}
    />
  );
};

export { ComponentDetailConsumer };
