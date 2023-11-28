/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type InputChangeEvent } from '@progress/kendo-react-inputs';
import React, { useContext, useEffect } from 'react';

import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { STATUS_MODAL, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { OrderType, ProductSource } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IApiRequest } from '../../api/api.interface';
import { ActionAPI, type IPOS, type IResponseSearchBarcodeItem } from './types';
import ViewPOS from './view';
interface IStatePOS extends IPOS {
  action: ActionAPI;
  api: IApiRequest;
  form: {
    phone: string;
    barcode: string;
  };
  payload: any;
  errors: {
    isEmptyProduct: boolean;
    isExistWarehouse: boolean;
  };
}

interface IComponentPOS {
  searchBarcode: IApiRequest;
  checkConsumer: IApiRequest;
  orderGoods: IApiRequest;
}
const ComponentPOS = ({ searchBarcode, checkConsumer, orderGoods }: IComponentPOS) => {
  const storeId = AuthService.getPackageProfile()?.storeId;

  const initialStatePOS: IStatePOS = {
    cartActive: 0,
    carts: [
      {
        consumer: '',
        products: [],
        loading: true,
      },
    ],
    action: ActionAPI.default,
    api: searchBarcode,
    form: {
      phone: '',
      barcode: '',
    },
    payload: undefined,
    errors: {
      isEmptyProduct: false,
      isExistWarehouse: false,
    },
  };
  const [state, setState] = React.useState<IStatePOS>(initialStatePOS);
  const { onSetView, status, setStatus } = useContext(ContextModal);
  const newCart = React.useMemo(() => {
    return [...state.carts];
  }, []);
  const loading = React.useMemo(() => {
    return Helper.isEmpty(newCart[state.cartActive].consumer) && Helper.isEmpty(newCart[state.cartActive].products);
  }, [newCart[state.cartActive].consumer, newCart[state.cartActive].products]);

  const handleAddBill = () => {
    newCart.push(initialStatePOS.carts[0]);
    setState(prev => {
      return {
        ...prev,
        carts: newCart,
        cartActive: state.cartActive + 1,
      };
    });
  };
  const handleDeleteBill = (idTab: number) => {
    if (idTab !== 0) {
      newCart.splice(idTab, 1);
      setState(prev => {
        return {
          ...prev,
          carts: newCart,
          cartActive: initialStatePOS.cartActive,
          action: ActionAPI.default,
        };
      });
    }
  };
  const handleChangeOrder = (idTab: number) => {
    setState(prev => {
      return {
        ...prev,
        cartActive: idTab,
      };
    });
  };
  const handleChangeQuantity = (index: number, value: string) => {
    newCart[state.cartActive].products[index].quantity = value;
    setState(prev => {
      return {
        ...prev,
        carts: newCart,
      };
    });
  };
  const handleDeleteProductInCart = (index: number) => {
    newCart[state.cartActive].products.splice(index, 1);
    newCart[state.cartActive].loading = loading;
    setState(prev => {
      return {
        ...prev,
        carts: newCart,
      };
    });
  };
  const handleCancelCart = () => {
    newCart[state.cartActive].products = [];
    setState(prev => {
      return {
        ...prev,
        carts: newCart,
      };
    });
  };
  const handlePay = () => {
    const payload = {
      orderType: 0,
      consumerId: state.carts[state.cartActive].consumer.consumerId,
      storeId,
      orderGoodsList: state.carts[state.cartActive].products.map(item => ({
        goodsId: item.goodsId,
        quantity: item.quantity,
        // productWarrantyCode: item.productWarrantyCode,
      })),
    };
    setState({ ...state, action: ActionAPI.orderGoods, api: orderGoods, payload });
  };
  const handleSelectProduct = (product: any) => {
    const checkProductExist = state.carts[state.cartActive].products.map(pro => pro.id).indexOf(product.id);
    if (checkProductExist === -1) {
      newCart[state.cartActive].products.push(product);
      setState(prev => {
        return {
          ...prev,
          carts: newCart,
        };
      });
    } else {
      handleDeleteProductInCart(checkProductExist);
    }
  };
  const handleSearchBarcode = (values: any) => {
    setState({
      ...state,
      api: searchBarcode,
      action: ActionAPI.searchBarcode,
      form: { ...state.form, barcode: values.barcode },
    });
  };
  const handleCheckConsumer = (values: any) => {
    setState({
      ...state,
      api: checkConsumer,
      action: ActionAPI.checkConsumer,
      form: { ...state.form, phone: values.phone },
    });
  };
  useEffect(() => {
    console.log('first');
    switch (state.action) {
      case ActionAPI.checkConsumer:
        mutate({
          phone: state.form.phone,
        });
        break;
      case ActionAPI.searchBarcode:
        mutate({
          listBarcode: [state.form.barcode],
          storeId,
        });
        break;
      case ActionAPI.orderGoods:
        mutate(state.payload);
        break;
      default:
        break;
    }
  }, [state.action, state.form]);
  const funcRequestSuccess = {
    handleRequestSuccess: (data: any) => {
      try {
        console.log('data', data);
        switch (state.action) {
          case ActionAPI.searchBarcode:
            if (!Helper.isEmpty(data)) {
              const dataSearch: IResponseSearchBarcodeItem = data[0];
              const goodsId =
                dataSearch.productDictionaryModel?.skuModel.goodsModel?.goodsId ||
                dataSearch.retailerProductModel?.skuModel.goodsModel?.goodsId;
              if (
                dataSearch.productDictionaryModel?.skuModel.goodsModel?.goodsId ||
                dataSearch.retailerProductModel?.skuModel.goodsModel?.goodsId
              ) {
                const checkProduct = state.carts[state.cartActive].products.findIndex(pro => pro.goodsId === goodsId);
                let product = {};
                switch (dataSearch.productSource) {
                  case ProductSource.productDictionary:
                    if (dataSearch.productDictionaryModel) {
                      product = {
                        image: Helper.generalSrcImage(JSON.parse(dataSearch.productDictionaryModel.images)[0]),
                        price: dataSearch.productDictionaryModel.skuModel.goodsModel?.price,
                        name: dataSearch.productDictionaryModel.skuModel.name,
                        quantity: 1,
                        goodsId,
                        productWarrantyCode: '',
                      };
                    }
                    break;
                  case ProductSource.retailer:
                    if (dataSearch.retailerProductModel) {
                      product = {
                        image: Helper.generalSrcImage(JSON.parse(dataSearch.retailerProductModel.images)[0]),
                        price: dataSearch.retailerProductModel.skuModel.goodsModel?.price,
                        name: dataSearch.retailerProductModel.retailerProductName,
                        quantity: 1,
                        goodsId,
                        productWarrantyCode: '',
                      };
                    }
                    break;
                  default:
                    return {
                      productId: '',
                      sku: '',
                      images: '',
                      name: '',
                    };
                }
                if (checkProduct < 0) {
                  const pushNewProductInCart = [...newCart[state.cartActive].products, Object.assign({}, product)];
                  newCart[state.cartActive] = {
                    consumer: newCart[state.cartActive].consumer,
                    products: pushNewProductInCart,
                    loading,
                  };
                } else {
                  newCart[state.cartActive].products[checkProduct].quantity =
                    Number(newCart[state.cartActive].products[checkProduct].quantity) + 1;
                }
                setState({
                  ...state,
                  errors: initialStatePOS.errors,
                  carts: newCart,
                });
              } else {
                setState({
                  ...state,
                  errors: {
                    isEmptyProduct: false,
                    isExistWarehouse: true,
                  },
                });
              }
            } else {
              setState({
                ...state,
                errors: {
                  isExistWarehouse: false,
                  isEmptyProduct: true,
                },
              });
            }

            break;
          case ActionAPI.checkConsumer:
            newCart[state.cartActive] = {
              consumer: data,
              products: state.carts[state.cartActive].products,
              loading,
            };
            setState({ ...state, carts: newCart });
            break;
          case ActionAPI.orderGoods:
            onSetView({
              typeDialog: TYPE_DIALOG.SELECT_PAYMENT_ORDER,
              typeModel: TYPE_MODAL.CUSTOM,
              data: {
                orderGroupId: data.orderGroup.orderGroupId,
                amountReceived: data.orderGroup.totalPrice,
              },
              onSubmit: () => {
                if (state.carts.length !== 1 && state.cartActive !== 0) {
                  handleDeleteBill(state.cartActive);
                } else {
                  newCart[state.cartActive].consumer = undefined;
                  newCart[state.cartActive].products = [];
                  newCart[state.cartActive].loading = true;
                  setState({
                    ...state,
                    carts: newCart,
                    action: ActionAPI.default,
                  });
                }
              },
            });
            break;
          default:
            break;
        }
      } catch (error: any) {
        LoggerService.error('ComponentPOS execute handleRequestSuccess receive error', error);
      }
    },
    handleNotExistConsumer: () => {
      toastDefault(ENUMS_TOAST.ERROR, 'Consumer not found');
      newCart[state.cartActive].loading = true;
      setState({ ...state, carts: newCart });
    },
  };
  const { mutate } = useRequest(state.api, funcRequestSuccess);

  console.log('state__', state);
  return (
    <ViewPOS
      onAddBill={handleAddBill}
      onCheckConsumer={handleCheckConsumer}
      onSearchBarcode={handleSearchBarcode}
      onSelectProduct={handleSelectProduct}
      onPay={handlePay}
      onCancel={handleCancelCart}
      onDeleteProductInCart={handleDeleteProductInCart}
      onChangeQuantity={handleChangeQuantity}
      onChangeOrder={handleChangeOrder}
      onDeleteBill={handleDeleteBill}
      cartActive={state.cartActive}
      carts={state.carts}
      loading={state.carts[state.cartActive].loading}
      errors={state.errors}
    />
  );
};

export default ComponentPOS;
