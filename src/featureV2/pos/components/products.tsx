import { Form, FormElement } from '@progress/kendo-react-form';
import React from 'react';

import productDefault from '@/assets/imagesV2/common/productDefault.jpg';
import productEmpty from '@/assets/imagesV2/common/productEmpty.jpg';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import { Helper } from '@/utils/Helper';

import { type IPOS } from '../types';

export interface IProductsComponentPOS extends Omit<IPOS, 'consumer' | 'carts'> {
  onSelectProduct: (product: any) => void;
  onSearchBarcode: (value: any) => void;
  products: any[];
  errors: {
    isEmptyProduct: boolean;
    isExistWarehouse: boolean;
  };
}

const ProductsComponentPOS: React.FC<IProductsComponentPOS> = ({
  cartActive,
  products,
  onSelectProduct,
  onSearchBarcode,
  errors,
}) => {
  const error = Helper.isEmpty(products) || errors.isEmptyProduct || errors.isExistWarehouse;

  const handleRenderTextError = () => {
    if (errors.isEmptyProduct) {
      return 'There are currently no products';
    }
    if (errors.isExistWarehouse) {
      return 'The product has not been imported into the warehouse';
    }
    if (Helper.isEmpty(products)) {
      return 'There are currently no products';
    }
  };
  return (
    <div className='flex flex-column gap-5'>
      <div className='flex items-center justify-between pr-2'>
        <div className='text-3xl'>Products</div>
        <div className='flex items-center'>
          <div className='w-36 font-bold'>Search barcode:</div>
          <Form
            key={`${products.length}`}
            onSubmit={onSearchBarcode}
            render={() => {
              return (
                <div className='flex gap-2 items-center'>
                  <InputRoot
                    placeholder='Enter barcode...'
                    name='barcode'
                  />
                  <FormElement>
                    <ButtonRoot
                      themeColor={'secondary'}
                      type='submit'
                      style={{
                        padding: '0px',
                        height: '44px',
                        width: '50px',
                        marginTop: '4px',
                      }}>
                      <span className='k-icon k-i-search' />
                    </ButtonRoot>
                  </FormElement>
                </div>
              );
            }}
          />
        </div>
      </div>
      <div
        style={{
          height: 750,
        }}
        className='flex flex-wrap gap-4 overflow-x-auto scroll pr-2'>
        {error ? (
          <div className='flex flex-column gap-5 justify-center items-center h-full w-full'>
            <img
              className='w-96'
              src={productEmpty}
            />
            <div className='text-xl text-neutral-70'>{handleRenderTextError()}</div>
          </div>
        ) : (
          <div
            onClick={() => {
              onSelectProduct(products[products.length - 1]);
            }}
            style={{
              minWidth: '158px',
              maxHeight: '250px',
            }}
            className='border border-neutral-50 border-solid p-3 cursor-pointer relative flex flex-column items-center'>
            <img
              style={{
                maxWidth: '150px',
              }}
              className='h-40 object-contain'
              src={products[products.length - 1].image || productDefault}
            />
            <div className='flex flex-column items-center'>
              <span className='text-lg font-bold'>{products[products.length - 1].name}</span>
              <span className='text-lg text-primary font-bold'>${products[products.length - 1].price}.00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsComponentPOS;
