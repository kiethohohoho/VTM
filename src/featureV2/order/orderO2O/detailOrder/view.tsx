import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Config from '@/Config';
import { type IDialog } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { ScreenLoader } from '@/core2/loader';
import { TableRoot } from '@/core2/table';
import { CellHeader, CellRoot } from '@/core2/table/components/cell';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IResponseDetail } from './component';
import { DetailOrderInformation } from './components/DetailOrderInformation';
import { DetailOrderSummary } from './components/DetailOrderSummary';
interface IViewDetailOrder {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}
const config = new Config().getState();
const gridColumnsFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: '',
      width: '50',
      cell: ({ dataItem }) => {
        return (
          <CellRoot align='center'>
            {dataItem.image && (
              <img
                src={`${config.api.static.host}${Helper.parseStringified(dataItem.image)[0]}`}
                width={40}
                height={40}
                alt={dataItem.name}
              />
            )}
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      filter: 'text',
      title: 'orderO2O.name',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`#`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.name}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'price',
      title: 'orderO2O.price',
      headerCell: ({ title }) => {
        return (
          <CellHeader align='center'>
            <Localize tid={title} />
          </CellHeader>
        );
      },
      cell: ({ dataItem }) => {
        return <CellRoot align='center'>{dataItem.price}</CellRoot>;
      },
    },
    {
      field: 'quantity',
      title: 'orderO2O.quantity',
      headerCell: ({ title }) => {
        return (
          <CellHeader align='center'>
            <Localize tid={title} />
          </CellHeader>
        );
      },
      cell: ({ dataItem }) => {
        return <CellRoot align='center'>{dataItem.quantity}</CellRoot>;
      },
    },
  ];
};
const ViewDetailOrder: FunctionComponent<IViewDetailOrder> = ({
  detail,
  loading,
  handleUpdate,
  handleUpdateSuccess,
}) => {
  const gridColumns: GridColumnProps[] = gridColumnsFC();

  return loading ? (
    <ScreenLoader />
  ) : (
    detail && (
      <CardPage
        title={`Order #${detail.orderId}`}
        className='px-10'
        backPath={EnumPath.ORDER}>
        <section className='flex gap-10 xl:flex-column'>
          <div>
            <TableRoot
              data={detail.listOrderGoods}
              gridColumns={gridColumns}
              sort={[]}
              sortable
            />
            <DetailOrderInformation detail={detail} />
          </div>
          <DetailOrderSummary detail={detail} />
        </section>
      </CardPage>
    )
  );
};

export { ViewDetailOrder };
