import { type FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { type STATUS_STORE, type STATUS_YES_NO } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailStoreComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  storeId: string;
  address: string;
  countryCode: string;
  createdAt: number;
  createdBy: string;
  // districtCode: string;
  isOnline: STATUS_YES_NO;
  license: string;
  modifiedAt: number;
  modifiedBy: string;
  name: string;
  nameOwner: string;
  residence: string;
  status: STATUS_STORE;
  taxNumber: string;
  userId: string;
  shopName: string;
}

const DetailStoreComponent: FunctionComponent<DetailStoreComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);

  const params = useParams();

  const callbackFuncDetailStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        setDetail(data);
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

  const { isLoading } = useGet({ ...api, params: { storeId: params?.storeId } }, callbackFuncDetailStore);
  return (
    <View
      detail={detail}
      loading={isLoading}
    />
  );
};

export default DetailStoreComponent;
