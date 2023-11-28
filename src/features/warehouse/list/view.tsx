import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { CardPage } from '@/core2/card';
import { CellRoot } from '@/core2/table/components/cell';
import TableRequest from '@/core2/table/request';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import FormToolbar from './components/formToolbar';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
}

const gridColumnsListWarehouseFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'warehouseId',
      title: 'warehouse.warehouseId',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`${EnumPath.WAREHOUSE}/${dataItem.warehouseId}`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.warehouseId}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      filter: 'text',
      title: 'warehouse.name',
    },
    {
      field: 'address',
      filter: 'text',
      title: 'warehouse.address',
    },
    {
      field: 'storeId',
      filter: 'text',
      title: 'store.storeId',
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      cell: ({ dataItem }) => <CellRoot>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
    },
  ];
};

const ViewListWarehouse: FunctionComponent<ViewProps> = props => {
  const { apiList, payload } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListWarehouseFC();
  return (
    <CardPage>
      <TableRequest
        toolbar={FormToolbar}
        sortable
        payload={payload}
        apiList={apiList}
        gridColumns={gridColumns}
      />
    </CardPage>
  );
};

export default ViewListWarehouse;
