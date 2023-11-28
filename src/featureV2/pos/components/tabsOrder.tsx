import React from 'react';

import { type IPOS } from '../types';

interface IPOSTabsOrder extends Pick<IPOS, 'carts' | 'cartActive'> {
  onClick: (idTab: number) => void;
  onClickDelete: (idTab: number) => void;
  onAddBill: () => void;
}

const POSTabsOrder: React.FC<IPOSTabsOrder> = ({ carts, children, cartActive, onClick, onClickDelete, onAddBill }) => {
  return (
    <div>
      <ul className='list-none flex mx-0 px-0'>
        {carts.map((cart, index) => {
          const isActive = cartActive === index;
          return (
            <li
              key={POSTabsOrder.name + index.toString()}
              className={`text-lg cursor-pointer ${
                isActive && 'bg-neutral-40'
              } flex items-center justify-between pr-4 rounded-t-lg`}>
              <div
                onClick={() => {
                  onClick(index);
                }}
                style={{
                  paddingRight: '0px',
                }}
                className='w-20 p-4'>
                <span className={isActive ? 'text-neutral-100' : 'text-neutral-60'}>Bill {index + 1}</span>
              </div>
              {isActive && (
                <span
                  onClick={() => {
                    onClickDelete(index);
                  }}
                  className='k-icon k-i-close hover:bg-neutral-60 rounded-full'
                />
              )}
            </li>
          );
        })}
        <li className={`text-lg cursor-pointer flex items-center justify-between px-4 rounded-t-lg`}>
          <span
            onClick={onAddBill}
            className='k-icon k-i-plus hover:bg-neutral-60 rounded-full p-4'
          />
        </li>
      </ul>
      <div className='bg-neutral-40 p-5'>{children}</div>
    </div>
  );
};

export default POSTabsOrder;
