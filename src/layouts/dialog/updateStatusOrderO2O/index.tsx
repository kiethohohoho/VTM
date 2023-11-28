import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';
import { type STATUS_DEVICE } from '@/utils/Enums';

import DialogUpdateStatusOrderComponent from './component';
export interface IParametersUpdate {
  status: STATUS_DEVICE;
  password: string;
}
export interface IDialogUpdateStatusOrder {
  api: IApiRequest;
}
export interface IViewUpdateStatusOrders {
  handleSubmit: (parameters: Record<string, any>) => void;
  loading: boolean;
  onShowModal: () => void;
  detail: any;
}

const config = new Config().getState();

function DialogUpdateStatusOrderO2OIndex() {
  /* variable */
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsOrder.o2oOrderManagement,
    headers: { token: auth?.token },
  };

  return <DialogUpdateStatusOrderComponent api={api} />;
}

export default DialogUpdateStatusOrderO2OIndex;
