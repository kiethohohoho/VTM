import React from 'react';

import { Helper } from '@/utils/Helper';

import { type IListOrderGoods } from '..';

interface IRowLayer2Component {
  orderGoods: IListOrderGoods;
  onGetIdLayer1: (idLayer1: string) => void;
  idLayer1Extend: string;
  index: number;
  lastChild: boolean;
}

const RowLayer2Component: React.FC<IRowLayer2Component> = ({
  orderGoods,
  idLayer1Extend,
  onGetIdLayer1,
  index,
  lastChild,
}) => {
  console.log('RowLayer2Component check orderGoods', orderGoods);
  return (
    <React.Fragment>
      <article
        style={{
          background: Helper.equalTwoIdCategory(orderGoods.goodsId, idLayer1Extend) ? '#D4D7DD' : '#EAE9E9',
          borderColor: '#9DB2BF',
        }}
        className={`ls-flex ls-flex-col ls-gap_2 ${lastChild ? 'ls-rounded-b' : 'ls-bd_b'}`}>
        <section className='ls-w_full ls-flex ls-items_center'>
          <div className='ls-w_14 ls-text_align-center'>{index + 1}</div>
          <div className='ls-grid ls-grid-col-3 ls-w_full'>
            <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{orderGoods.name}</div>
            <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{orderGoods.price}</div>
            <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{orderGoods.quantity}</div>
          </div>
        </section>
      </article>
    </React.Fragment>
  );
};

export default RowLayer2Component;
