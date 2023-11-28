import { Form, FormElement } from '@progress/kendo-react-form';
import { type InputChangeEvent } from '@progress/kendo-react-inputs';
import { CardBody, CardHeader } from '@progress/kendo-react-layout';
import React from 'react';

import productEmpty from '@/assets/imagesV2/common/productEmpty.jpg';
import { ButtonRoot } from '@/core2/button';
import { InputQuantity, InputRoot } from '@/core2/input';
import { Helper } from '@/utils/Helper';

import { type IPOS } from '../types';

interface ICartComponentPOS extends Omit<IPOS, 'products'> {
  onChangeQuantity: (index: number, value: string) => void;
  onDeleteProductInCart: (index: number) => void;
  onCancel: () => void;
  onPay: () => void;
  onCheckConsumer: (value: any) => void;
  loading: boolean;
}

const EmptyCart = () => {
  return (
    <div className='flex flex-column justify-center items-center gap-3'>
      <img
        className='w-40'
        src={productEmpty}
      />
      <div className='text-sx text-neutral-70'>There are currently no products in the cart.</div>
    </div>
  );
};

interface IItemCart extends Omit<ICartComponentPOS, 'consumer' | 'onCancel' | 'onPay' | 'onCheckConsumer'> {}

const ItemCart: React.FC<IItemCart> = ({ carts, cartActive, onDeleteProductInCart, onChangeQuantity }) => {
  return (
    <div className='flex flex-column gap-5'>
      {carts[cartActive].products.map((cart, index) => {
        return (
          <div
            className='flex items-center justify-between'
            key={ItemCart.name + index.toString()}>
            <div className='flex gap-2 items-center'>
              <div
                onClick={() => {
                  onDeleteProductInCart(index);
                }}
                className='text-danger hover:bg-danger-bg-color w-8 h-8 flex items-center justify-center rounded-full cursor-pointer'>
                <span className='k-icon k-i-delete' />
              </div>
              <img
                src={cart.image}
                className='w-10 h-10 object-contain'
              />
              <div className='flex flex-column w-32 text-neutral-80'>
                <span className='text-sm'>{cart.name}</span>
                <span className='text-xs'>${cart.price}</span>
              </div>
              <div key={`${cart.quantity}`}>
                <InputQuantity
                  defaultValue={cart.quantity}
                  onChange={(event: InputChangeEvent) => {
                    onChangeQuantity(index, event.value);
                  }}
                  name='quantity'
                  isForm={false}
                />
              </div>
            </div>
            <div className='pl-3 font-bold'>${Number(cart.price) * Number(cart.quantity)}</div>
          </div>
        );
      })}
    </div>
  );
};

const CartComponentPOS: React.FC<ICartComponentPOS> = ({
  carts,
  onCancel,
  cartActive,
  onPay,
  onCheckConsumer,
  loading,
  ...other
}) => {
  const sumTotalPrice = () => {
    const result = carts[cartActive].products.reduce(function (acc, obj) {
      const price = Number(obj.price);
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return acc + price * obj.quantity;
    }, 0);
    return result;
  };
  const sumTotalQuantity = () => {
    const result = carts[cartActive].products.reduce(function (acc, obj) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return acc + obj.quantity;
    }, 0);
    return result;
  };
  return (
    <div
      className='flex flex-column gap-5'
      style={{
        width: '440px',
        height: '100%',
      }}>
      <article className='border border-dashed p-4 border-neutral-50'>
        <div className='text-neutral-100 text-3xl flex justify-between items-center text-center border-b border-solid border-neutral-40 pb-3'>
          <div>Consumer</div>
          <div>
            <Form
              key={carts[cartActive].consumer?.name || ''}
              onSubmit={onCheckConsumer}
              render={() => {
                return (
                  <div className='flex w-56 gap-2 items-center'>
                    <InputRoot
                      isForm
                      placeholder='Enter phone...'
                      name='phone'
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
        {carts[cartActive].consumer && (
          <div className='mt-4'>
            <div className='flex justify-between py-3'>
              <span className='text-neutral-80'>Name consumer</span>
              <span className='font-bold'>{carts[cartActive].consumer.name || '-'}</span>
            </div>
            <div className='flex justify-between py-3'>
              <span className='text-neutral-80'>Phone</span>
              <span className='font-bold'>{carts[cartActive].consumer.phone || '-'}</span>
            </div>
          </div>
        )}
      </article>
      <div className='border border-dashed p-4 border-neutral-50'>
        <CardHeader>
          <div className='text-center flex flex-column gap-3'>
            <h1 className='my-0'>Cart</h1>
            <div className='flex justify-center pl-10 text-neutral-70'>
              <div className='px-5'>Total Item: {carts[cartActive].products.length}</div>
              <div className='px-5 border-l border-solid'>Total Quantity: {sumTotalQuantity()}</div>
            </div>
          </div>
        </CardHeader>
        <section className='flex flex-column'>
          <article>
            <CardBody
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}>
              {Helper.isEmpty(carts[cartActive].products) ? (
                <EmptyCart />
              ) : (
                <ItemCart
                  loading={loading}
                  cartActive={cartActive}
                  {...other}
                  carts={carts}
                />
              )}
            </CardBody>
          </article>
          <article>
            <div>
              <div className='flex justify-between py-3 border-b border-solid border-neutral-40'>
                <span className='text-neutral-80'>Subtotal</span>
                <span className='font-bold'>${sumTotalPrice()}</span>
              </div>
              <div className='flex justify-between py-3 border-b border-solid border-neutral-40'>
                <span className='text-neutral-80'>
                  Discount (<span className='font-bold'> 0 </span>%)
                </span>
                <span className='font-bold'>0</span>
              </div>
              <div className='flex justify-between py-3 border-b border-solid border-neutral-40'>
                <span className='text-neutral-80'>
                  Tax (<span className='font-bold'> 0 </span>%)
                </span>
                <span className='font-bold'>$0</span>
              </div>
              <div className='flex justify-between py-3 border-b border-solid border-neutral-40'>
                <span className='text-neutral-80'>Grand Total</span>
                <span className='font-bold'>${sumTotalPrice()}</span>
              </div>
            </div>
            <div className='pt-4 flex justify-between'>
              <ButtonRoot
                onClick={onCancel}
                themeColor={'secondary'}
                className='w-40'
                icon='close'
                text='Cancel'
              />
              <ButtonRoot
                onClick={onPay}
                themeColor={'primary'}
                className='w-40'
                icon='js'
                text='Pay'
                disabled={loading}
              />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default CartComponentPOS;
