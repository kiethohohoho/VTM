import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { Localize } from '@/context/languages';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import AuthService from '@/utils/Auth';
import { EnumPath, STATUS_ORDER_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { ChipStatusOrder } from '../../components/chipStatus';
import { FormToolbarListOrderO2O } from './components/formToolbar';
interface IViewListOrder {
  apiList: IApiRequest;
  payload: object;
}
const gridColumnsListFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },

    {
      field: 'orderId',
      title: 'order.orderId',
      filter: 'text',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`${EnumPath.ORDER}/${dataItem.orderId}`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.orderId}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'orderValue',
      title: 'total',
      headerClassName: '!k-text-center',
      className: '!k-text-center',
    },
    {
      field: 'purchasersName',
      title: 'consumer',
      headerClassName: '!k-text-left',
      className: '!k-text-left',
    },

    {
      field: 'status',
      title: 'status',
      headerClassName: '!k-text-left',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const status: number = props.dataItem.orderStatus;
        return (
          <CellRoot align='start'>
            <ChipStatusOrder status={status}>
              {<Localize tid={`order.status.${STATUS_ORDER_PARSE[status]}`} />}
            </ChipStatusOrder>
          </CellRoot>
        );
      },
    },

    {
      field: 'orderDate',
      title: 'date',
      headerClassName: '!k-text-right',
      cell: ({ dataItem }) => <CellRoot align='end'>{Helper.formatDateFull(dataItem?.orderDate)}</CellRoot>,
    },
  ];
};
function ViewListOrder(props: IViewListOrder) {
  const { apiList, payload } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListFC();
  const profileDetails = AuthService.getPackageProfile();
  return (
    <TableRequest
      toolbar={({ dataState, onDataStateChange }) => (
        <FormToolbarListOrderO2O
          dataState={dataState}
          onDataStateChange={onDataStateChange}
        />
      )}
      sortable
      apiList={apiList}
      gridColumns={gridColumns}
      payload={{ ...payload, storeId: profileDetails.storeId }}
      queryRequest={true}
      customPayload={['storeId']}
    />
  );
}

export { ViewListOrder };
