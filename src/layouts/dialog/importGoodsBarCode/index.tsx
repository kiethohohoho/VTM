import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentDialogImportGoodsBarcode } from './component';

const config = new Config().getState();

const DialogImportGoodsBarcodeIndex = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsProduct.goods,
    headers: {
      token: auth?.token,
    },
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

  const searchBarcode: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.checkMultipleBarcode,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentDialogImportGoodsBarcode
      api={api}
      apiListWareHouse={apiListWarehouse}
      apiListCurrency={apiListCurrency}
      apiSearchBarcode={searchBarcode}
    />
  );
};
export default DialogImportGoodsBarcodeIndex;
