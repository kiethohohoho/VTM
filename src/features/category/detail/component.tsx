import { type FunctionComponent, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { EnumPath } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface DetailCategoryComponentProps {
  apiDetailInStore: IApiRequest;
  apiListProductInStore: IApiRequest;
  apiListProductO2O: IApiRequest;
}
export interface IResponseDetail {
  categoryInStoreId: string;
  name: string;
  storeId: string;
  content: string;
  modifiedAt: number;
  modifiedBy: string;
}
export interface IParamsApiInStore {
  categoryInStoreId: string;
}
export interface IPayloadApiO2O {
  categoryId: string;
  storeId: string;
}
export interface DetailCategoryState {
  detail: IResponseDetail | null;
  customPayload: string[] | [];
  paramApi: IParamsApiInStore | null;
  payloadApi: IPayloadApiO2O | null;
  apiRequestProduct: IApiRequest | null;
}
const initState: DetailCategoryState = {
  detail: null,
  customPayload: [],
  paramApi: null,
  payloadApi: null,
  apiRequestProduct: null,
};
const DetailCategoryComponent: FunctionComponent<DetailCategoryComponentProps> = props => {
  const { apiDetailInStore, apiListProductInStore, apiListProductO2O } = props;
  const [state, setState] = useState<DetailCategoryState>(initState);
  const param = useParams();
  const { onSetView } = useContext(ContextModal);
  const location = useLocation();

  const callbackFuncDetailCategory = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('DetailCategoryComponent execute handleRequestSuccess receive data', typeof data);
        setState(s => ({ ...s, detail: data }));
      } catch (error: any) {
        LoggerService.error('DetailCategoryComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailCategoryComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailCategoryComponent execute handleRequestError receive error', error);
      }
    },
  };
  const arrPath = location.pathname.split('/');

  const { isLoading: isLoadingDetail, mutate } = useRequest(apiDetailInStore, callbackFuncDetailCategory);

  const handleUpdateSuccess = () => {
    mutate({ categoryInStoreId: arrPath[2] });
  };
  useEffect(() => {
    let { customPayload, paramApi, payloadApi, apiRequestProduct } = state;
    switch (`/${arrPath[1]}`) {
      case EnumPath.CATEGORY_IN_STORE:
        paramApi = { categoryInStoreId: param.categoryInStoreId as string };
        mutate(paramApi);
        customPayload = ['categoryInStoreId'];
        apiRequestProduct = apiListProductInStore;
        break;
      case EnumPath.CATEGORY_O2O:
        payloadApi = { categoryId: param.categoryId as string, storeId: param.storeId as string };
        customPayload = ['categoryId', 'storeId'];
        apiRequestProduct = apiListProductO2O;
        break;
    }

    setState(s => ({ ...s, customPayload, paramApi, payloadApi, apiRequestProduct }));
  }, []);
  return (
    <View
      detail={state.detail}
      loadingDetail={isLoadingDetail}
      handleUpdate={onSetView}
      handleUpdateSuccess={handleUpdateSuccess}
      apiListProduct={state.apiRequestProduct}
      payloadApi={state.payloadApi}
      paramApi={state.paramApi}
      customPayload={state.customPayload}
    />
  );
};

export default DetailCategoryComponent;
