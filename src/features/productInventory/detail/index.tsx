import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailProductInventoryComponent from './component';

const config = new Config().getState();

const DetailProductInventoryIndex = () => {
  const auth = AuthService.getPackageAuth();

  const searchBarcode: IApiRequest = {
    method: 'get',
    url: config.api.lsProduct.sku,
    headers: {
      token: auth?.token,
    },
  };
  return <DetailProductInventoryComponent apiSearchBarcode={searchBarcode} />;
};
export default DetailProductInventoryIndex;
