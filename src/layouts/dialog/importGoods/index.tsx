import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentDialogImportGoods } from './component';

const config = new Config().getState();

function DialogImportGoodsIndex() {
  /* variable */
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.goods,
    headers: { token: auth?.token },
  };
  const apiListWarehouse: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.warehouse._,
    headers: {
      token: auth?.token,
    },
  };

  const apiListCurrency: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.currency,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentDialogImportGoods
      api={api}
      apiListWarehouse={apiListWarehouse}
      apiListCurrency={apiListCurrency}
    />
  );
}

export default DialogImportGoodsIndex;
