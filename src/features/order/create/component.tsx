import { type FieldValidatorType, type FormRenderProps } from '@progress/kendo-react-form';
import { type RadioButtonProps, type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import { type FunctionComponent, useContext, useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize, LocalizeContent } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { getListStore } from '@/features/common/getListStore';
import { ORDER_TYPE_PARSE, OrderType } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface CreateOrderComponentProps {
  apiCreate: IApiRequest;
  apiGetGoods: IApiRequest;
  apiGetConsumer: IApiRequest;
}
export interface OrderGoodsItem {
  key: string;
  goodsId: string;
  sku: string;
  quantity: number;
  quantityAvailable: string;
  productWarrantyCode?: string;
}
export interface IPayloadCreateOrder {
  storeId: string;
  orderType: OrderType;
  orderGoodsList: OrderGoodsItem[];
  consumerId?: string;
}
interface IPayloadGoods {
  storeId: string;
  barcode: string;
}
export interface DataItemGoods {
  goodsId: string;
  quantityAvailable: string;
  sku: string;
  isSelected?: boolean;
}

interface DataGoods {
  productDictionaryModel: { name: string; description: string };
  sku: DataItemGoods;
}
export interface CreateOrderState {
  action: ACTION_REQUEST_ORDER;
  dataGoods: DataGoods | null;
  orderGoodsList: OrderGoodsItem[];
  isShowBtn: boolean;
  orderType: OrderType;
  consumerId: string | null;
  view: VIEW_STEP_ORDER;
  orderRes: any;
}

export const orderTypeList: RadioButtonProps[] = [
  { value: OrderType.orderOffline, label: `order.${ORDER_TYPE_PARSE[OrderType.orderOffline]}` },
  { value: OrderType.walkInGuest, label: `order.${ORDER_TYPE_PARSE[OrderType.walkInGuest]}` },
];
enum ACTION_REQUEST_ORDER {
  GET_GOODS,
  GET_CONSUMER,
  CREATE_ORDER,
}
export enum VIEW_STEP_ORDER {
  ORDER,
  PAYMENT,
}
const initialState: CreateOrderState = {
  action: ACTION_REQUEST_ORDER.GET_GOODS,
  dataGoods: null,
  orderGoodsList: [],
  isShowBtn: true,
  orderType: OrderType.walkInGuest,
  consumerId: null,
  view: VIEW_STEP_ORDER.ORDER,
  orderRes: {},
};
const CreateOrderComponent: FunctionComponent<CreateOrderComponentProps> = props => {
  // const navigate = useNavigate();
  const { onSetView, data } = useContext(ContextModal);
  const [state, setState] = useState<CreateOrderState>(initialState);
  const { apiCreate, apiGetGoods, apiGetConsumer } = props;
  const callbackFuncOrder = {
    handleRequestSuccess: (data: any) => {
      try {
        let { action, dataGoods, orderGoodsList, consumerId, isShowBtn, view, orderRes } = state;
        switch (action) {
          case ACTION_REQUEST_ORDER.GET_GOODS:
            {
              const dataGoodsRes = data;
              orderGoodsList.forEach(goods => {
                const id = dataGoodsRes.listSKUs.findIndex((s: any) => s.goodsId === goods.goodsId);
                if (id !== -1) {
                  dataGoodsRes.listSKUs[id].isSelected = true;
                }
              });
              dataGoods = dataGoodsRes;
              setState(s => ({ ...s, dataGoods }));
            }
            break;
          case ACTION_REQUEST_ORDER.CREATE_ORDER:
            toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='order.createSuccess' />);
            view = VIEW_STEP_ORDER.PAYMENT;
            orderRes = data;
            setState(s => ({ ...s, view, orderRes }));
            // navigate(`${EnumPath.ORDER}/${data.orderGroup.orderGroupId}/payment`);
            break;
          case ACTION_REQUEST_ORDER.GET_CONSUMER:
            consumerId = data.consumerId;
            isShowBtn = true;
            setState(s => ({ ...s, consumerId, isShowBtn }));
            break;
        }
        LoggerService.debug('CreateOrderComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('CreateOrderComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('CreateOrderComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('CreateOrderComponent execute handleRequestError receive error', error);
      }
    },
    handleDuplicateName: () => {
      try {
        let { consumerId, isShowBtn } = state;
        isShowBtn = false;
        consumerId = 'order.consumerNotFound';
        setState(s => ({ ...s, consumerId, isShowBtn }));
      } catch (error: any) {
        LoggerService.error('CreateOrderComponent execute handleDuplicateName receive error', error);
      }
    },
  };
  const handleSubmitCreateOrder = (dataItem: Record<string, any>) => {
    const { orderGoodsList, consumerId } = state;
    const storeId = dataItem.storeId?.id || listStore[0]?.id;
    const payload: IPayloadCreateOrder = {
      storeId,
      orderType: dataItem.orderType,
      orderGoodsList,
    };
    if (dataItem.orderType === OrderType.orderOffline) {
      payload.consumerId = consumerId as string;
    }
    setState(s => ({ ...s, action: ACTION_REQUEST_ORDER.CREATE_ORDER }));
    mutateCreateOrder(payload);
  };
  const { isLoading, mutate: mutateCreateOrder } = useRequest(apiCreate, callbackFuncOrder);
  const { isLoading: loadingGoods, mutate: getListGoods } = useRequest(apiGetGoods, callbackFuncOrder);
  const { mutate: getConsumer } = useRequest(apiGetConsumer, callbackFuncOrder);

  const { isLoading: loadingStore, listStore } = getListStore();
  const handleGetGoodsList = (e: FormRenderProps) => {
    const storeId = e.valueGetter('storeId')?.id || listStore[0].id;
    const payload: IPayloadGoods = {
      storeId,
      barcode: e.valueGetter('barcode'),
    };
    setState(s => ({ ...s, action: ACTION_REQUEST_ORDER.GET_GOODS }));
    getListGoods(payload);
  };
  const handleSelectGoods = (data: DataItemGoods) => {
    const { dataGoods, orderGoodsList } = state;
    if (!dataGoods) return;
    orderGoodsList.push({
      key: Helper.randomKey(),
      goodsId: data.goodsId,
      sku: data.sku,
      quantity: 0,
      quantityAvailable: data.quantityAvailable,
    });
    setState(s => ({ ...s, dataGoods, orderGoodsList }));
  };
  const handleUnSelectedGoods = (data: OrderGoodsItem) => {
    const { dataGoods, orderGoodsList } = state;
    if (!dataGoods) return;
    const idOrderGoods = orderGoodsList.findIndex((item: OrderGoodsItem) => item.goodsId === data.goodsId);
    orderGoodsList.splice(idOrderGoods, 1);
    setState(s => ({ ...s, dataGoods, orderGoodsList }));
  };
  const handleChangeQuantity = (e: any, data: OrderGoodsItem) => {
    const { orderGoodsList } = state;
    const idOrderGoods = orderGoodsList.findIndex((item: OrderGoodsItem) => item.goodsId === data.goodsId);
    orderGoodsList[idOrderGoods].quantity = Number(e.value);
    setState(s => ({ ...s, orderGoodsList }));
  };
  const handleChangeOrderType = (event: RadioGroupChangeEvent) => {
    let { orderType, isShowBtn, consumerId } = state;
    switch (event.value) {
      case OrderType.orderOffline:
        if (!consumerId) {
          isShowBtn = false;
        }
        break;
      case OrderType.walkInGuest:
        isShowBtn = true;
        break;
    }
    orderType = event.value;
    setState(s => ({ ...s, orderType, isShowBtn }));
  };
  const handleCheckConsumer = (data: FormRenderProps) => {
    try {
      LoggerService.debug('CreateOrderComponent execute handleCheckConsumer', data.valueGetter('phone'));
      const payload = {
        phone: data.valueGetter('phone'),
      };
      setState(s => ({ ...s, action: ACTION_REQUEST_ORDER.GET_CONSUMER }));
      getConsumer(payload);
    } catch (error: any) {
      LoggerService.error(`CreateOrderComponent execute handleCheckConsumer`, error.toString());
    }
  };
  const { SetLocalizeId } = LocalizeContent();
  function validateOrderGoods(quantity: string): FieldValidatorType {
    return (value: any): string => {
      if (!Number(value)) {
        return SetLocalizeId('validateOrder.onlyNumber');
      }
      if (Number(quantity) < Number(value)) {
        return SetLocalizeId('validateOrder.overQuantity');
      }
      return '';
    };
  }
  useEffect(() => {
    if (data?.consumerId) {
      setState(s => ({ ...s, consumerId: data?.consumerId, isShowBtn: true }));
    }
  }, [data?.consumerId]);
  return (
    <View
      handleSubmit={handleSubmitCreateOrder}
      loading={isLoading}
      loadingStore={loadingStore}
      listStore={listStore}
      stateComponent={state}
      handleGetGoodsList={handleGetGoodsList}
      loadingGoods={loadingGoods}
      handleSelectGoods={handleSelectGoods}
      handleUnSelectedGoods={handleUnSelectedGoods}
      handleChangeQuantity={handleChangeQuantity}
      handleChangeOrderType={handleChangeOrderType}
      handleCheckConsumer={handleCheckConsumer}
      handleAddConsumer={onSetView}
      validateOrderGoods={validateOrderGoods}
    />
  );
};

export default CreateOrderComponent;
