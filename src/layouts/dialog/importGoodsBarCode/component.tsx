import { type FunctionComponent, useContext, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { ProductSource } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import {
  type IImportProductModel,
  type IProductDictionaryModel,
  type IRetailerProductModel,
  type IStandardImportProductModel,
  type IWarehouse,
} from './types';
import { ViewDialogImportGoodsByBarcode } from './view';

interface DialogImportGoodsBarcodeComponentProps {
  api: IApiRequest;
  apiListWareHouse: IApiRequest;
  apiListCurrency: IApiRequest;
  apiSearchBarcode: IApiRequest;
}
export interface IPayloadImportGoodsBarcode {
  sku: string;
  productDictionaryId: string;
  storeId: string;
  wareHouseId: string;
  quantity: number;
  importPrice: string;
  sellingPrice?: string;
}

const ComponentDialogImportGoodsBarcode: FunctionComponent<DialogImportGoodsBarcodeComponentProps> = props => {
  const { onShowModal, setStatus, onSubmit } = useContext(ContextModal);
  const [warehouses, setWareHouses] = useState<IItemDataDropDown[]>([]);
  const { apiListWareHouse, apiSearchBarcode, api } = props;
  const [listProduct, setListProduct] = useState<IImportProductModel[]>([]);
  const callbackFuncListWareHouse = {
    handleRequestSuccess: (data: IWarehouse[]) => {
      try {
        LoggerService.debug(
          'ComponentDialogImportGoodByBarcode execute callbackFuncListWareHouse.handleRequestSuccess receive response',
          data,
        );
        if (!Helper.isEmpty(data)) {
          const list: IItemDataDropDown[] = data.map((item: IWarehouse) => ({
            id: item.warehouseId,
            text: item.name,
          }));
          setWareHouses(list);
        } else {
          setWareHouses([]);
        }
      } catch (error: any) {
        LoggerService.error(
          'ComponentDialogImportGoodByBarcode execute callbackFuncListWareHouse.handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDialogImportGoodByBarcode execute callbackFuncListWareHouse.handleRequestError');
      } catch (error: any) {
        LoggerService.error(
          'ComponentDialogImportGoodByBarcode execute callbackFuncListWareHouse.handleRequestError receive error',
          error,
        );
      }
    },
  };
  const { isLoading: isLoadingGetListWareHouse, mutate: mutateGetWareHouses } = useRequest(
    apiListWareHouse,
    callbackFuncListWareHouse,
  );

  const handleChooseStore = (storeId: string) => {
    try {
      LoggerService.info('ComponentDialogImportGoodByBarcode execute handleChooseStore');
      LoggerService.debug('ComponentDialogImportGoodByBarcode execute handleChooseStore getWareHouse storeId', storeId);
      const payload = { storeId };
      // setStoreId(storeId);
      mutateGetWareHouses(payload);
    } catch (error: any) {
      LoggerService.error('ComponentDialogImportGoodByBarcode execute handleChooseStore receive error', error);
    }
  };
  const callbackFuncCheckBarcode = {
    handleRequestSuccess: (data: IImportProductModel[]) => {
      try {
        LoggerService.debug('ComponentDialogImportGoodByBarcode execute handleRequestSuccess receive list', data);
        if (data.length > 0) {
          setListProduct(data);
          const { storeId } = AuthService.getPackageProfile();
          handleChooseStore(storeId);
        } else {
          toastDefault(ENUMS_TOAST.WARNING, <Localize tid='notFoundResult' />);
        }
        // setProductDictionaryModel(data.productDictionaryModel);
      } catch (error: any) {
        LoggerService.error('ComponentDialogImportGoodByBarcode execute handleRequestSuccess receive error', error);
      }
    },
    handleNotFoundResult: () => {
      try {
        LoggerService.info('ComponentDialogImportGoodByBarcode execute handleNotFoundResult');
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid='notFoundResult' />);
      } catch (error: any) {
        LoggerService.error('ComponentDialogImportGoodByBarcode execute handleNotFoundResult receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDialogImportGoodByBarcode execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('ComponentDialogImportGoodByBarcode execute handleRequestError receive error', error);
      }
    },
  };
  const { isLoading: isLoadingSearchBarcode, mutate: mutateSearchBarcode } = useRequest(
    apiSearchBarcode,
    callbackFuncCheckBarcode,
  );

  const handleSearchBarcode = (dataItem: Record<string, any>) => {
    try {
      LoggerService.info('ComponentDialogImportGoodByBarcode execute handleSearchBarcode');
      const listBarcode = dataItem.barcode.replaceAll(' ', '').split(',');
      const { storeId } = AuthService.getPackageProfile();
      const payload = {
        listBarcode,
        storeId,
      };
      mutateSearchBarcode(payload);
    } catch (error: any) {
      LoggerService.error('ComponentDialogImportGoodByBarcode execute handleSearchBarcode receive error', error);
    }
  };

  const callbackFunc = {
    handleRequestSuccess: (response: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='product.importSuccess' />);
        onShowModal();
        onSubmit && onSubmit();
        setStatus(STATUS_MODAL.SUCCESS);
        LoggerService.debug(
          'DialogImportProductComponent execute callbackFunc handleRequestSuccess receive response',
          response,
        );
      } catch (error: any) {
        LoggerService.error(
          'DialogImportProductComponent execute callbackFunc handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogImportProductComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DialogImportProductComponent execute handleRequestError receive error', error.toString());
      }
    },
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);

  const handleSubmit = (dataItem: Record<string, any>) => {
    try {
      LoggerService.debug('ComponentDialogImportGoodByBarcode execute handleSubmit received data', dataItem);
      const { storeId } = AuthService.getPackageProfile();
      const importGoodsList: IPayloadImportGoodsBarcode[] = [];
      for (const property in dataItem) {
        if (property !== 'warehouse') {
          const goods = dataItem[property];
          importGoodsList.push({
            sku: property.split('-')[1],
            productDictionaryId: property.split('-')[0],
            quantity: Number(goods?.quantity),
            sellingPrice: goods?.sellingPrice,
            importPrice: goods?.importPrice,
            wareHouseId: warehouses[0].id,
            storeId,
          });
        }
      }
      const payload = { importGoodsList };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('ComponentDialogImportGoodByBarcode execute handleSubmit receive error', error.toString());
    }
  };
  const convertProductDataFromServer = (product: IImportProductModel): IStandardImportProductModel => {
    try {
      switch (product.productSource) {
        case ProductSource.productDictionary:
          return {
            productId: (product.productDictionaryModel as IProductDictionaryModel).productDictionaryId,
            sku: (product.productDictionaryModel as IProductDictionaryModel).skuModel.sku,
            images: (product.productDictionaryModel as IProductDictionaryModel).images,
            name: (product.productDictionaryModel as IProductDictionaryModel).name,
            goodsModel: (product.productDictionaryModel as IProductDictionaryModel)?.skuModel.goodsModel,
          };
        case ProductSource.retailer:
          return {
            productId: (product.retailerProductModel as IRetailerProductModel).retailerProductId,
            sku: (product.retailerProductModel as IRetailerProductModel).skuModel.skuVariationIncluded,
            images: (product.retailerProductModel as IRetailerProductModel).images,
            name: (product.retailerProductModel as IRetailerProductModel).retailerProductName,
            goodsModel: (product.retailerProductModel as IRetailerProductModel).skuModel.goodsModel,
          };
        default:
          return {
            productId: '',
            sku: '',
            images: '',
            name: '',
          };
      }
    } catch (error: any) {
      LoggerService.error(
        'ComponentDialogImportGoodByBarcode execute convertProductDataFromServer receive error',
        error.toString(),
      );
      return {
        productId: '',
        sku: '',
        images: '',
        name: '',
      };
    }
  };
  return (
    <ViewDialogImportGoodsByBarcode
      isLoadingGetListWareHouse={isLoadingGetListWareHouse}
      isLoading={isLoading}
      warehouses={warehouses}
      listProduct={listProduct}
      isLoadingSearchBarcode={isLoadingSearchBarcode}
      handleChooseStore={handleChooseStore}
      handleSearchBarcode={handleSearchBarcode}
      handleSubmit={handleSubmit}
      convertProductDataFromServer={convertProductDataFromServer}
    />
  );
};

export { ComponentDialogImportGoodsBarcode };
