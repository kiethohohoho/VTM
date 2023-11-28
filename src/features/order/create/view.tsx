import { type FieldValidatorType, Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type RadioGroupChangeEvent } from '@progress/kendo-react-inputs';
import { type FunctionComponent } from 'react';

import { type IDialog, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot, RadioGroupRoot } from '@/core2/input';
import { LoaderRoot } from '@/core2/loader';
import { OrderType } from '@/utils/Enums';

import OrderPaymentComponent from '../payment';
import {
  type CreateOrderState,
  type DataItemGoods,
  type OrderGoodsItem,
  orderTypeList,
  VIEW_STEP_ORDER,
} from './component';

interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
  loadingStore: boolean;
  listStore: IItemDataDropDown[] | [];
  stateComponent: CreateOrderState;
  handleGetGoodsList: (data: FormRenderProps) => void;
  loadingGoods: boolean;
  handleSelectGoods: (item: DataItemGoods) => void;
  handleUnSelectedGoods: (item: OrderGoodsItem) => void;
  handleChangeQuantity: (e: any, item: OrderGoodsItem) => void;
  handleChangeOrderType: (e: RadioGroupChangeEvent) => void;
  handleCheckConsumer: (data: FormRenderProps) => void;
  handleAddConsumer: (parameter: IDialog) => void;
  validateOrderGoods: (quantity: string) => FieldValidatorType;
}

const ViewCreateOrder: FunctionComponent<ViewProps> = ({
  handleSubmit,
  loading,
  loadingGoods,
  loadingStore,
  listStore,
  stateComponent,
  handleGetGoodsList,
  handleSelectGoods,
  handleUnSelectedGoods,
  handleChangeQuantity,
  handleChangeOrderType,
  handleCheckConsumer,
  handleAddConsumer,
  validateOrderGoods,
}) => {
  const { dataGoods, orderGoodsList, orderType, consumerId } = stateComponent;
  return (
    <>
      {stateComponent.view === VIEW_STEP_ORDER.ORDER && (
        <CardPage>
          {!loadingStore && listStore ? (
            <section className='ls-pt_medium ls-profile-grid_col1-3'>
              <article className='ls-py_medium ls-bd_b ls-mb_medium'>
                <h2 className='text-3xl font-bold underline'>
                  <Localize tid='order.createTitle' />
                </h2>
              </article>
              <Form
                initialValues={{
                  storeId: listStore[0],
                  orderType: orderTypeList[1].value,
                }}
                onSubmit={handleSubmit}
                render={(formRenderProps: FormRenderProps) => {
                  return (
                    <FormElement>
                      <div className='ls-w-full ls-pt_larger ls-flex ls-gap_2'>
                        {/* <div className='ls-w_50percent'>
                      <DropDownRoot
                        defaultValue={listStore[0]}
                        label={'store.storeName'}
                        id='storeId'
                        name='storeId'
                        isForm
                        data={listStore}
                        onGetValue={(id: string, value: string) => {}}
                      />
                    </div> */}
                        <div className='ls-w_50percent'>
                          <RadioGroupRoot
                            defaultValue={orderTypeList[1].value}
                            isForm
                            name='orderType'
                            id='orderType'
                            label='order.orderType'
                            data={[]}
                            onChange={(event: RadioGroupChangeEvent) => {
                              handleChangeOrderType(event);
                            }}
                          />
                        </div>
                      </div>
                      {orderType === OrderType.orderOffline && (
                        <div className='ls-w-full ls-pt_larger ls-grid ls-grid-col-2 ls-gap_2'>
                          <div>
                            <InputRoot
                              label={'order.findConsumer'}
                              id='phone'
                              name='phone'
                            />
                          </div>
                          <div className='ls-flex ls-gap_2'>
                            <div className='ls-flex ls-flex-col ls-justify_end'>
                              <ButtonRoot
                                type='button'
                                className='ls-w_36'
                                icon='zoom'
                                onClick={() => {
                                  handleCheckConsumer(formRenderProps);
                                }}>
                                <span className='ls-px_sm'>
                                  <Localize tid='check' />
                                </span>
                              </ButtonRoot>
                            </div>
                            <div className='ls-flex ls-flex-col ls-justify_end'>
                              <ButtonRoot
                                type='button'
                                className='ls-w_40'
                                icon='plus'
                                onClick={() => {
                                  handleAddConsumer({
                                    titleDialog: <Localize tid='consumer.updateTitle' />,
                                    typeDialog: TYPE_DIALOG.ORDER_ADD_CONSUMER,
                                    typeModel: TYPE_MODAL.CUSTOM,
                                    // onSubmit: () => {
                                    //   handleUpdateSuccess();
                                    // },
                                  });
                                }}>
                                <span className='ls-px_sm'>
                                  <Localize tid='order.createConsumer' />
                                </span>
                              </ButtonRoot>
                            </div>
                          </div>
                          {consumerId && (
                            <div className='ls-bd ls-bd_color-gray-600 ls-px_medium ls-rounded_base ls-py_medium'>
                              <Localize tid='order.consumerId' />:{' '}
                              {consumerId === 'order.consumerNotFound' ? (
                                <Localize tid='order.consumerNotFound' />
                              ) : (
                                <span>{consumerId}</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      <div className='ls-w-full ls-pt_larger ls-flex ls-gap_2'>
                        <div className='ls-w_50percent'>
                          <InputRoot
                            label={'order.barcode'}
                            id='barcode'
                            name='barcode'
                          />
                        </div>
                        <div className='ls-flex ls-flex-col ls-justify_end'>
                          <ButtonRoot
                            type='button'
                            className='ls-w_36'
                            icon='zoom'
                            onClick={() => {
                              handleGetGoodsList(formRenderProps);
                            }}>
                            <span className='ls-px_sm'>
                              <Localize tid='search' />
                            </span>
                          </ButtonRoot>
                        </div>
                      </div>
                      {loadingGoods ? (
                        <LoaderRoot />
                      ) : (
                        dataGoods && (
                          <>
                            <p>List goods by barcode</p>
                            <div className='ls-bd ls-bd_color-gray-600 ls-p_medium ls-rounded_base ls-my_medium'>
                              <p>
                                <Localize tid='goods.name' />: {dataGoods.productDictionaryModel.name}
                              </p>
                              <p>
                                <Localize tid='description' />: {dataGoods.productDictionaryModel.description}
                              </p>
                              <div className='ls-grid ls-grid-col-4 ls-gap_2'>
                                {/* {dataGoods.sku.map((item: DataItemGoods) => ( */}
                                <div
                                  className='ls-bd ls-px_medium ls-rounded_base ls-bd_color-gray-600'
                                  key={dataGoods.sku.goodsId}>
                                  <p>SKU: {dataGoods.sku.sku}</p>
                                  <p>
                                    <Localize tid='quantityAvailable' />: {dataGoods.sku.quantityAvailable}
                                  </p>
                                  <div className='ls-flex ls-justify_end'>
                                    {orderGoodsList.find(item => item.goodsId === dataGoods.sku.goodsId) ? (
                                      <p>
                                        <Localize tid='order.added' />
                                      </p>
                                    ) : (
                                      <ButtonRoot
                                        type='button'
                                        // disabled={item.isSelected}
                                        className='ls-w_16 ls-h_7 ls-mb_sm'
                                        loading={loading}
                                        onClick={() => {
                                          handleSelectGoods(dataGoods.sku);
                                        }}>
                                        <Localize tid={'order.createSelectGoods'} />
                                      </ButtonRoot>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      )}
                      {orderGoodsList.length > 0 && (
                        <>
                          <p>List of selected SKUs</p>
                          <div className='ls-bd ls-bd_color-gray-600 ls-p_medium ls-rounded_base ls-my_medium'>
                            <div className='ls-grid ls-grid-col-4 ls-gap_2'>
                              {orderGoodsList.map((item: OrderGoodsItem) => (
                                <div
                                  className='ls-bd ls-px_medium ls-rounded_base ls-bd_color-gray-600 ls-p_medium'
                                  key={item.key}>
                                  <div className='ls-flex ls-justify_end'>
                                    <ButtonRoot
                                      className='ls-w_8 ls-h_8'
                                      icon='close'
                                      type='button'
                                      onClick={() => {
                                        handleUnSelectedGoods(item);
                                      }}></ButtonRoot>
                                  </div>
                                  <p>SKU: {item.sku}</p>
                                  <InputRoot
                                    label={'order.quantity'}
                                    id={`quantity${item.goodsId}`}
                                    name={item.key}
                                    onChange={event => {
                                      handleChangeQuantity(event, item);
                                    }}
                                    validatorTypes={validateOrderGoods(item.quantityAvailable)}
                                  />
                                  {/* {item.error && (
                                <span className='ls-text_error'>
                                  <Localize tid={item.error} />
                                </span>
                              )} */}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      <div className='ls-flex ls-justify_end'>
                        <ButtonRoot
                          type='submit'
                          disabled={!formRenderProps.valid || !stateComponent.isShowBtn || orderGoodsList.length === 0}
                          className='ls-w_36'
                          loading={loading}>
                          <Localize tid={'profile.submit'} />
                        </ButtonRoot>
                      </div>
                    </FormElement>
                  );
                }}
              />
            </section>
          ) : (
            <LoaderRoot />
          )}
        </CardPage>
      )}
      {stateComponent.view === VIEW_STEP_ORDER.PAYMENT && <OrderPaymentComponent orderRes={stateComponent.orderRes} />}
    </>
  );
};

export default ViewCreateOrder;
