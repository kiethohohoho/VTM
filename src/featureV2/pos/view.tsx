import React from 'react';

import { CardForm, CardPage } from '@/core2/card';

import CartComponentPOS from './components/cart';
import ProductsComponentPOS from './components/products';
import POSTabsOrder from './components/tabsOrder';
import { type IFormSearchBarcode, type IPOS } from './types';

interface IViewPOS extends IPOS {
  onDeleteBill: (idTab: number) => void;
  onChangeOrder: (idTab: number) => void;
  onChangeQuantity: (index: number, value: string) => void;
  onDeleteProductInCart: (index: number) => void;
  onCancel: () => void;
  onPay: () => void;
  onSelectProduct: (product: any) => void;
  onSearchBarcode: (values: Record<string, IFormSearchBarcode>) => void;
  onAddBill: () => void;
  onCheckConsumer: (value: any) => void;
  loading: boolean;
  errors: {
    isEmptyProduct: boolean;
    isExistWarehouse: boolean;
  };
}

const ViewPOS: React.FC<IViewPOS> = ({
  onChangeOrder,
  onDeleteBill,
  onChangeQuantity,
  onDeleteProductInCart,
  onSelectProduct,
  onSearchBarcode,
  onAddBill,
  carts,
  cartActive,
  onCancel,
  loading,
  errors,
  ...other
}) => {
  return (
    <CardPage>
      <div className='p-10'>
        <POSTabsOrder
          carts={carts}
          cartActive={cartActive}
          onAddBill={onAddBill}
          onClick={onChangeOrder}
          onClickDelete={onDeleteBill}
          {...other}>
          <div className='flex flex-column gap-5'>
            <div className='flex gap-5'>
              <CardForm
                style={{
                  paddingRight: '12px',
                  width: '100%',
                }}>
                <ProductsComponentPOS
                  errors={errors}
                  cartActive={0}
                  onSearchBarcode={onSearchBarcode}
                  onSelectProduct={onSelectProduct}
                  {...other}
                  products={carts[cartActive].products}
                />
              </CardForm>
              <CardForm>
                <CartComponentPOS
                  loading={loading}
                  carts={carts}
                  cartActive={cartActive}
                  onCancel={onCancel}
                  onDeleteProductInCart={onDeleteProductInCart}
                  onChangeQuantity={onChangeQuantity}
                  {...other}
                />
              </CardForm>
            </div>
          </div>
        </POSTabsOrder>
      </div>
    </CardPage>
  );
};

export default ViewPOS;
