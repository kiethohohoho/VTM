import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';
import { type STATUS_DEVICE } from '@/utils/Enums';

import DialogUpdateOrderComponent from './component';
export interface IParametersUpdate {
  status: STATUS_DEVICE;
  password: string;
}
export interface IDialogUpdateOrder {
  api: IApiRequest;
}
export interface IViewUpdateOrders {
  handleSubmit: (parameters: Record<string, any>) => void;
  loading: boolean;
  onShowModal: () => void;
}

const config = new Config().getState();

function DialogUpdateOrderIndex() {
  /* variable */
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsOrder.consumer,
    headers: { token: auth?.token },
  };

  return <DialogUpdateOrderComponent api={api} />;
}

export default DialogUpdateOrderIndex;
