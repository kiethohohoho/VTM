import { useQueryClient } from '@tanstack/react-query';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

interface IProductService {
  callbackUpdateGoodsO2O?: () => void;
}
const config = new Config().getState();

const productService = (props: IProductService) => {
  const { callbackUpdateGoodsO2O } = props;
  const auth = AuthService.getPackageAuth();
  const queryClient = useQueryClient();

  const apiUpdateO2O: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.goods,
    headers: {
      token: auth?.token,
    },
  };
  const callbackFuncUpdateGoodsO2O = {
    handleRequestSuccess: (data: object) => {
      try {
        LoggerService.debug(
          'productService execute callbackFuncUpdateGoodsO2O.handleRequestSuccess receive response',
          data,
        );
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='product.updateSuccess'></Localize>);
        callbackUpdateGoodsO2O && callbackUpdateGoodsO2O();
        queryClient.invalidateQueries(['delete', config.api.lsProduct.product]);
      } catch (error: any) {
        LoggerService.error(
          'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestError');
      } catch (error: any) {
        LoggerService.error(
          'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestError receive error',
          error,
        );
      }
    },
  };
  const { isLoading: isUpdateGoodsO2OLoading, mutate: mutateUpdateGoodsO2O } = useRequest(
    apiUpdateO2O,
    callbackFuncUpdateGoodsO2O,
  );
  return {
    mutateUpdateGoodsO2O,
    isUpdateGoodsO2OLoading,
  };
};

export { productService };
