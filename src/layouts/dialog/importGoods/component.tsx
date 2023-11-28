import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet, useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IWarehouse } from '../importGoodsBarCode/types';
import { ViewDialogImportGoods } from './view';

export interface IComponentDialogImportGoods {
  api: IApiRequest;
  apiListWarehouse: IApiRequest;
  apiListCurrency: IApiRequest;
}

const config = new Config().getState();
function ComponentDialogImportGoods({ api, apiListWarehouse, apiListCurrency }: IComponentDialogImportGoods) {
  const { onShowModal, setStatus, data, onSubmit } = useContext(ContextModal);
  const [warehouses, setWareHouses] = useState<IItemDataDropDown[]>([]);
  const queryClient = useQueryClient();
  const funcRequestAddGoods = {
    handleRequestSuccess: (data: any) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='product.importSuccess' />);
        onShowModal();
        onSubmit && onSubmit();
        setStatus(STATUS_MODAL.SUCCESS);
        queryClient.invalidateQueries(['get', config.api.lsProduct.sku]);
        LoggerService.debug('ComponentDialogImportGoods execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('ComponentDialogImportGoods execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDialogImportGoods execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ComponentDialogImportGoods execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequestAddGoods);

  const callbackFuncListWareHouse = {
    handleRequestSuccess: (data: IWarehouse[]) => {
      try {
        LoggerService.debug(
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestSuccess receive response',
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
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestError');
      } catch (error: any) {
        LoggerService.error(
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestError receive error',
          error,
        );
      }
    },
  };
  const { isLoading: isLoadingGetListWareHouse } = useGet(
    {
      ...apiListWarehouse,
      payload: {
        order: Order.CREATED_AT,
        by: OrderBy.DESC,
        when: 'currency',
      },
      params: {
        storeId: data.storeId,
      },
    },
    callbackFuncListWareHouse,
  );
  const handleImportGoods = (dataItem: Record<string, any>) => {
    LoggerService.debug('ComponentDialogImportGoods execute handleUpdateStatusDevice submit dataItem', dataItem);
    const { storeId } = AuthService.getPackageProfile();
    const payload = Helper.removeObjectEmpty({
      sku: data.goods.sku,
      productDictionaryId: data.productDictionaryId,
      quantity: Number(dataItem.quantity),
      sellingPrice: dataItem?.sellingPrice,
      importPrice: dataItem.importPrice,
      wareHouseId: warehouses[0].id,
      storeId,
    });
    mutate(payload);
  };

  return (
    <ViewDialogImportGoods
      loading={isLoading}
      onShowModal={onShowModal}
      handleSubmit={handleImportGoods}
      isLoadingGetListWareHouse={isLoadingGetListWareHouse}
      warehouses={warehouses}
    />
  );
}

export { ComponentDialogImportGoods };
