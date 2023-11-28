import { type FunctionComponent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type ISKUModel } from './types';
import View from './view';

interface DetailProductInventoryComponentProps {
  apiSearchBarcode: IApiRequest;
}
const DetailProductInventoryComponent: FunctionComponent<DetailProductInventoryComponentProps> = props => {
  const { apiSearchBarcode } = props;
  const { status, onSetView } = useContext(ContextModal);
  const [listSKU, setListSKU] = useState<ISKUModel[]>([]);
  const callbackFuncCheckBarcode = {
    handleRequestSuccess: (data: ISKUModel[]) => {
      try {
        LoggerService.debug('DetailProductInventoryComponentProps execute handleRequestSuccess receive list', data);
        setListSKU(data);
      } catch (error: any) {
        LoggerService.error('DetailProductInventoryComponentProps execute handleRequestSuccess receive error', error);
      }
    },
    handleNotFoundResult: () => {
      try {
        LoggerService.info('DetailProductInventoryComponentProps execute handleNotFoundResult');
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid='notFoundResult' />);
      } catch (error: any) {
        LoggerService.error('DetailProductInventoryComponentProps execute handleNotFoundResult receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DetailProductInventoryComponentProps execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DetailProductInventoryComponentProps execute handleRequestError receive error', error);
      }
    },
  };
  const params = useParams();
  const { isLoading: isLoadingSearchBarcode } = useGet(
    { ...apiSearchBarcode, params: { productDictionaryId: params?.productDictionaryId, storeId: params?.storeId } },
    callbackFuncCheckBarcode,
  );

  return (
    <View
      key={status}
      listSKU={listSKU}
      handleUpdate={onSetView}
      isLoadingSearchBarcode={isLoadingSearchBarcode}
    />
  );
};

export default DetailProductInventoryComponent;
