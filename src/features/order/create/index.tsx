import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import CreateConsumerComponent from './component';

const config = new Config().getState();

const IndexCreateConsumer = () => {
  const auth = AuthService.getPackageAuth();

  const apiCreate: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.order,
    headers: {
      token: auth?.token,
    },
  };
  const apiGetGoods: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.orderGoods,
    headers: {
      token: auth?.token,
    },
  };
  const apiGetConsumer: IApiRequest = {
    method: 'get',
    url: config.api.lsOrder.consumer,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <CreateConsumerComponent
      apiCreate={apiCreate}
      apiGetGoods={apiGetGoods}
      apiGetConsumer={apiGetConsumer}
    />
  );
};
export default IndexCreateConsumer;
