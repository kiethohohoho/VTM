import { type FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface OrderPaymentComponentProps {
  api: IApiRequest;
  orderRes: any;
}
export interface IPayload {
  orderGroupId: string;
  amountReceived: string;
  paymentMethod: number;
}

const OrderPaymentComponent: FunctionComponent<OrderPaymentComponentProps> = props => {
  const [detail, setDetail] = useState<any>(null);
  const navigate = useNavigate();
  // const params = useParams();
  const { api, orderRes } = props;
  const callbackFuncCategory = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='order.paySuccess' />);
        setDetail(data);
        LoggerService.debug('OrderPaymentComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('OrderPaymentComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('OrderPaymentComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('OrderPaymentComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmitCreateCategroy = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      orderGroupId: orderRes.orderGroup.orderGroupId,
      amountReceived: dataItem.amountReceived,
      paymentMethod: Number(dataItem.paymentMethod),
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFuncCategory);
  const handleDone = () => {
    navigate(EnumPath.ORDER);
  };
  return (
    <View
      handleSubmit={handleSubmitCreateCategroy}
      loading={isLoading}
      handleDone={handleDone}
      detail={detail}
      orderRes={orderRes}
    />
  );
};

export default OrderPaymentComponent;
