import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import OrderPaymentComponent from './component';

const config = new Config().getState();

const IndexOrderPayment = ({ orderRes }: any) => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.payment,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <OrderPaymentComponent
      api={api}
      orderRes={orderRes}
    />
  );
};
export default IndexOrderPayment;
