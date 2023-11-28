import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { type STATUS_DEVICE } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailDeviceComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  deviceId: string;
  userId: string;
  deviceProducer: string;
  deviceModel: string;
  deviceName: string;
  deviceDisplayName: string;
  deviceType: string;
  deviceIPAddress: string;
  platformOS: string;
  versionOS: string;
  modifiedAt: number;
  modifiedBy: string;
  lastLogin: number;
  status: STATUS_DEVICE;
}

const DetailDeviceComponent: FunctionComponent<DetailDeviceComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  const callbackFuncDetailDevice = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('DetailDeviceComponent execute handleRequestSuccess receive data', data);
        setDetail(data);
      } catch (error: any) {
        LoggerService.error('DetailDeviceComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailDeviceComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailDeviceComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading, refetch } = useGet({ ...api, params: { deviceId: params?.deviceId } }, callbackFuncDetailDevice);
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

export default DetailDeviceComponent;
