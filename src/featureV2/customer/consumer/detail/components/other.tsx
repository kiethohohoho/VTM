import { type GridColumnProps, type GridDetailRowProps, type GridExpandChangeEvent } from '@progress/kendo-react-grid';
import React from 'react';

import { Localize } from '@/context/languages';
import { TableRoot } from '@/core2/table';
import { CellHeader, CellRoot } from '@/core2/table/components/cell';
import { ChipStatusOrder } from '@/featureV2/components/chipOrder';
import { ChipPaymentMethod } from '@/featureV2/components/chipPaymentMethod';
import { ChipPaymentStatus } from '@/featureV2/components/chipPaymentStatus';
import { PaymentMethodPrase, PaymentStatusPrase, StatusOrderPrase } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IOrder, type IResponseDetail } from '../types';

interface IOtherCustomer extends Pick<IResponseDetail, 'listOrder'> {}

const DetailComponent = ({ dataItem }: GridDetailRowProps) => {
  console.log('DetailComponent', dataItem);
  const gridColumns: GridColumnProps[] = React.useMemo(() => {
    return [
      {
        title: 'Id Goods',
        field: 'goodsId',
        width: 100,
        headerCell: ({ title }) => {
          return (
            <CellHeader className='text-neutral-60'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
      },
      {
        title: 'Price',
        field: 'price',
        width: 100,
        headerCell: ({ title }) => {
          return (
            <CellHeader
              className='text-neutral-60'
              align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return <CellRoot align='center'>{dataItem.price}</CellRoot>;
        },
      },
      {
        title: 'Quantity',
        field: 'quantity',
        width: 100,
        headerCell: ({ title }) => {
          return (
            <CellHeader
              className='text-neutral-60'
              align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return <CellRoot align='center'>{dataItem.quantity}</CellRoot>;
        },
      },
      {
        title: 'Name product',
        field: 'product.name',
        width: 150,
        headerCell: ({ title }) => {
          return (
            <CellHeader className='text-neutral-60'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
      },
      {
        title: 'Barcode',
        field: 'product.barcode',
        width: 100,
        headerCell: ({ title }) => {
          return (
            <CellHeader
              className='text-neutral-60'
              align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return <CellRoot align='center'>{dataItem.quantity}</CellRoot>;
        },
      },
      {
        title: 'Description',
        field: 'product.description',
        headerCell: ({ title }) => {
          return (
            <CellHeader className='text-neutral-60'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
      },
    ];
  }, []);
  return (
    <section className='border border-solid border-neutral-60 p-4 mb-2'>
      <div className='text-lg text-neutral-60 font-extrabold mb-2'>LIST DETAIL OTHER</div>
      <TableRoot
        isPageAble={false}
        data={dataItem.listOrderDetail}
        gridColumns={gridColumns}
      />
    </section>
  );
};

const OtherCustomer: React.FC<IOtherCustomer> = ({ listOrder }) => {
  const [dataState, setDataState] = React.useState<IOrder[]>(listOrder);

  const gridColumns: GridColumnProps[] = React.useMemo(() => {
    return [
      {
        title: 'Other ID',
        field: 'orderId',
        width: 150,
      },
      {
        title: 'Payment Status',
        field: 'paymentRes.status',
        headerCell: ({ title }) => {
          return (
            <CellHeader align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return (
            <CellRoot align='center'>
              <ChipPaymentStatus status={dataItem.status}>
                {PaymentStatusPrase[dataItem.paymentRes.status]}
              </ChipPaymentStatus>
            </CellRoot>
          );
        },
      },
      {
        title: 'Payment Method',
        field: 'paymentRes.paymentMethod',
        headerCell: ({ title }) => {
          return (
            <CellHeader align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return (
            <CellRoot align='center'>
              <ChipPaymentMethod status={dataItem.status}>
                {PaymentMethodPrase[dataItem.paymentRes.paymentMethod]}
              </ChipPaymentMethod>
            </CellRoot>
          );
        },
      },
      {
        title: 'Total Price',
        field: 'totalPrice',
      },
      {
        title: 'Status Order',
        field: 'status',
        headerCell: ({ title }) => {
          return (
            <CellHeader align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return (
            <CellRoot align='center'>
              <ChipStatusOrder status={dataItem.status}>{StatusOrderPrase[dataItem.status]}</ChipStatusOrder>
            </CellRoot>
          );
        },
      },
      {
        title: 'Date',
        field: 'createdAt',
        headerCell: ({ title }) => {
          return (
            <CellHeader align='center'>
              <Localize tid={title} />
            </CellHeader>
          );
        },
        cell: ({ dataItem }) => {
          return <CellRoot align='center'>{Helper.formatDate(dataItem.createdAt)}</CellRoot>;
        },
      },
    ];
  }, []);

  const handleExpandChange = (event: GridExpandChangeEvent) => {
    const newData = dataState.map((item: any) => {
      if (item.orderId === event.dataItem.orderId) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setDataState(newData);
  };
  return (
    <TableRoot
      title={`Orders (${dataState.length})`}
      onExpandChange={handleExpandChange}
      className='tableRootDetail'
      detail={DetailComponent}
      expandField='expanded'
      gridColumns={gridColumns}
      data={dataState}
      sort={[]}
      sortable
    />
  );
};

export default OtherCustomer;
