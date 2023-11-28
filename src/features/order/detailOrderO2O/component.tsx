import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { type STATUS_ORDER } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailOrderO2OComponentProps {
  api: IApiRequest;
}
export interface IResponseDetail {
  orderId: string;
  status: STATUS_ORDER;
  orderDate: number;
  totalAmount: string;
  paymentMethod: string;
  consigneeName: string;
  phone: string;
  address: string;
  listOrderGoods: Array<{
    goodsId: string;
    variation: string;
    image: string;
    name: string;
    quantity: number;
    price: string;
    productIdStore: string;
  }>;
}

const DetailOrderO2OComponent: FunctionComponent<DetailOrderO2OComponentProps> = props => {
  const { api } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  const callbackFuncDetailDevice = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('DetailOrderO2OComponent execute handleRequestSuccess receive data', data);
        setDetail(data);
      } catch (error: any) {
        LoggerService.error('DetailOrderO2OComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailOrderO2OComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailOrderO2OComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading, refetch } = useGet({ ...api, params: { orderId: params?.orderId } }, callbackFuncDetailDevice);
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

export default DetailOrderO2OComponent;
