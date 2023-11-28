import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import { type IResponseDetail } from '@/features/device/detail/component';
import AuthService from '@/utils/Auth';
import { type STATUS_DEVICE } from '@/utils/Enums';

import ComponentUpdateStatusDevice from './component';
export interface IParametersUpdateStatus {
  status: STATUS_DEVICE;
  password: string;
}
export interface IDialogUpdateStatusDevice {
  api: IApiRequest;
}
export interface IViewUpdateStatusDevice {
  handleSubmit: (parameters: Record<string, any>) => void;
  loading: boolean;
  onShowModal: () => void;
  detail: IResponseDetail;
}

const config = new Config().getState();

function DialogUpdateStatusRetailer() {
  /* variable */
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.device,
    headers: { token: auth?.token },
  };

  return <ComponentUpdateStatusDevice api={api} />;
}

export default DialogUpdateStatusRetailer;
