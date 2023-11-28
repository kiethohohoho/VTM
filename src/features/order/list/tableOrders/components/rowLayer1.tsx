import React from 'react';

import { Localize } from '@/context/languages';
import { ORDER_TYPE_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IOrderGroup } from '..';
import RowLayer2Component from './rowLayer2';

interface IRowLayer1Component {
  groupOrder: IOrderGroup;
  index: number;
  onGetIdLayer0: (idLayer0: string) => void;
  onGetIdLayer1: (idLayer1: string) => void;
  idLayer0Extend: string;
  idLayer1Extend: string;
}

interface ILineItem {
  label: string | React.ReactNode;
  value: string | number | React.ReactNode;
}
export const LineItem: React.FC<ILineItem> = ({ label, value }) => {
  return (
    <div className='ls-flex'>
      <div className='ls-w_36'>{label}: </div>
      <div>
        <span className='ls-px_medium'>{value}</span>
      </div>
    </div>
  );
};

const RowLayer1Component: React.FC<IRowLayer1Component> = ({
  groupOrder,
  index,
  onGetIdLayer0,
  idLayer0Extend,
  idLayer1Extend,
  onGetIdLayer1,
}) => {
  console.log('RowLayer1Component check orders', groupOrder);
  return (
    <article
      style={{
        background: Helper.equalTwoIdCategory(groupOrder.orderGroupId, idLayer0Extend) ? '#F6F6F6' : '#fff',
      }}
      className={'ls-flex ls-flex-col ls-bd_b ls-bd_secondary'}>
      <section className='ls-w_full ls-flex ls-items_center'>
        <div className='ls-w_20 ls-text_align-center'>{index + 1}</div>
        <div className='ls-grid ls-grid-col-3 ls-w_full'>
          <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{groupOrder.orderGroupId}</div>
          <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>
            {Helper.formatDateFull(groupOrder.orderDate)}
          </div>
          <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>
            <Localize tid={`order.${ORDER_TYPE_PARSE[groupOrder.orderType]}`} />
          </div>
        </div>
        <div
          className='ls-w_10 ls-text_align-start ls-cursor_pointer'
          onClick={() => {
            onGetIdLayer0(groupOrder.orderGroupId);
          }}>
          <span className='k-icon k-i-arrow-chevron-down'></span>
        </div>
      </section>
      {Helper.equalTwoIdCategory(groupOrder.orderGroupId, idLayer0Extend) && (
        <article
          style={{
            background: '#EAE9E9',
            borderColor: '#B7B7B7',
          }}
          className='ls-flex ls-gap_4 ls-mx_larger ls-mb_larger ls-p_larger ls-rounded_xl ls-bd'>
          <div
            style={{
              minWidth: 400,
            }}
            className='ls-flex ls-flex-col ls-gap_3'>
            <div className='ls-flex ls-justify_between ls-items_center'>
              <h1 className='ls-text_2xl'>
                <Localize tid={'order.infoBasic'} />
              </h1>
            </div>
            <LineItem
              label={<Localize tid={'order.orderId'} />}
              value={groupOrder.orders.orderId}
            />
            {/* <LineItem
              label={<Localize tid={'order.status'} />}
              value={
                groupOrder.orders.status === STATUS_ORDER.PENDING_PAYMENT ||
                groupOrder.orders.status === STATUS_ORDER.PREPARING ? (
                  <Link to={`${EnumPath.ORDER}/${groupOrder.orderGroupId}/payment`}>
                    <ChipStatus status={groupOrder.orders.status}>
                      <Localize tid={`order.${STATUS_ORDER_PARSE[groupOrder.orders.status]}`} />
                    </ChipStatus>
                  </Link>
                ) : (
                  <ChipStatus status={groupOrder.orders.status}>
                    <Localize tid={`order.${STATUS_ORDER_PARSE[groupOrder.orders.status]}`} />
                  </ChipStatus>
                )
              }
            /> */}
            <LineItem
              label={<Localize tid={'order.totalPrice'} />}
              value={groupOrder.orders.totalPrice}
            />
          </div>
          <div className='ls-w_full ls-flex ls-flex-col ls-gap_2'>
            <div className='ls-flex ls-gap_3 ls-items_center'>
              <h1 className='ls-text_2xl'>
                <Localize tid={'order.listOrderGoods'} />
              </h1>
            </div>
            <section
              style={{
                borderColor: '#9DB2BF',
                color: '#146C94',
              }}
              className='ls-bd ls-rounded_xl ls-w_full'>
              <article
                style={{
                  borderColor: '#9DB2BF',
                }}
                className='ls-flex ls-h_10 ls-items_center ls-bd_b'>
                <div className='ls-w_14 ls-text_align-center'>#</div>
                <div className='ls-grid ls-grid-col-3 ls-w_full'>
                  <div>
                    <Localize tid={'goods.name'} />
                  </div>
                  <div>
                    <Localize tid={'goods.price'} />
                  </div>
                  <div>
                    <Localize tid={'goods.quantity'} />
                  </div>
                </div>
                <div className='ls-w_10'></div>
              </article>
              {Helper.isArrayEmpty(groupOrder.orders.listOrderGoods) && (
                <article className='ls-flex ls-flex-col ls-h_10 ls-items_center ls-bd_secondary ls-justify_center ls-rounded_xl ls-py_medium'>
                  <div>
                    <span className='k-icon k-i-inbox ls-text_2xl'></span>
                  </div>
                  <Localize tid={'core.category.nodata'} />
                </article>
              )}
              {groupOrder.orders.listOrderGoods.map((orderGoods, index) => {
                return (
                  <RowLayer2Component
                    lastChild={index === groupOrder.orders.listOrderGoods.length - 1}
                    index={index}
                    idLayer1Extend={idLayer1Extend}
                    onGetIdLayer1={onGetIdLayer1}
                    orderGoods={orderGoods}
                    key={'orderGoods' + index.toString() + orderGoods.goodsId}
                  />
                );
              })}
            </section>
          </div>
        </article>
      )}
    </article>
  );
};

export default RowLayer1Component;
