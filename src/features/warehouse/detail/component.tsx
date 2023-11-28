import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailWarehouseComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  storeId: string;
  name: string;
  address: string;
  modifiedAt: number;
  modifiedBy: string;
}

const DetailWarehouseComponent: FunctionComponent<DetailWarehouseComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  const callbackFuncDetailStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('DetailWarehouseComponent execute handleRequestSuccess receive data', data);
        if (data.storeId) {
          setDetail(data);
        }
      } catch (error: any) {
        LoggerService.error('DetailWarehouseComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailWarehouseComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailWarehouseComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading, refetch } = useGet(
    { ...api, params: { warehouseId: params?.warehouseId } },
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

export default DetailWarehouseComponent;
