import React from 'react';

import { Localize } from '@/context/languages';
import { PAYMENT_METHOD_PARSE, STATUS_ORDER_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IResponseDetail } from '../component';

interface IDetailOrderInformation {
  detail: IResponseDetail;
}
interface IInformationItem {
  name: string;
  value: string | React.ReactNode;
  icon?: string;
}
interface IInformationList {
  title: string;
  children: React.ReactNode;
}

function DetailOrderInformation(props: IDetailOrderInformation) {
  const { detail } = props;
  const OrderInformationItem = ({ name, value, icon }: IInformationItem) => {
    return (
      <div>
        <div className='flex items-start gap-2 text-xs'>
          <span className={`k-icon k-font-icon k-i-${icon}`}></span>
          <div className='flex flex-column gap-2 justify-center'>
            <h4 className='m-0'>
              <Localize tid={name} />
            </h4>
            <div>{value}</div>
          </div>
        </div>
      </div>
    );
  };
  const OrderInformationList = ({ title, children }: IInformationList) => {
    return (
      <div>
        <span
          className='mb-5 block'
          style={{ fontSize: '18px' }}>
          <Localize tid={title}></Localize>
        </span>
        <div className='flex flex-column gap-6'>{children}</div>
      </div>
    );
  };
  return (
    <section className='bg-transparent mt-6 flex gap-12 items-start'>
      <OrderInformationList title='order.detail'>
        <OrderInformationItem
          icon='calendar'
          name='order.orderDate'
          value={Helper.convertToDate(detail.orderDate).toLocaleString()}
        />
        <OrderInformationItem
          icon='calculator'
          name='order.paymentMethod'
          value={<Localize tid={`order.pay.${PAYMENT_METHOD_PARSE[detail.paymentMethod]}`} />}
        />
        <OrderInformationItem
          icon='front-element'
          name='order.status'
          value={<Localize tid={`order.status.${STATUS_ORDER_PARSE[detail.status]}`} />}
        />
      </OrderInformationList>
      <OrderInformationList title='order.billingDetails'>
        <OrderInformationItem
          icon='user'
          name='name'
          value={<span className='text-primary'>{detail.consigneeName}</span>}
        />
        <OrderInformationItem
          icon='thumbnails-left'
          name='phone'
          value={
            <a
              href={`tel:${detail.phone}`}
              className='text-primary'
              style={{ textDecoration: 'none' }}>
              {detail.phone}
            </a>
          }
        />
        <OrderInformationItem
          icon='globe'
          name='address'
          value={detail.address}
        />
      </OrderInformationList>
    </section>
  );
}

export { DetailOrderInformation };
