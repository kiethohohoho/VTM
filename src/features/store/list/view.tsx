import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import React, { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { Localize } from '@/context/languages';
import { CellRoot } from '@/core2/table/components/cell';
import TableRequest from '@/core2/table/request';
import WrapperMain from '@/features/components/waraper';
import { ENUM_PARSE_STATUS_STORE, EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import ChipStatus from '../../productInventory/components/chipStatus';
import FormToolbar from './components/formToolbar';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
  onClickRedirect: (url: string) => void;
}

const gridColumnsFC = (onClickRedirect: (url: string) => void): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'storeId',
      title: 'store.storeId',
      cell: ({ dataItem }) => (
        <CellRoot>
          <a
            onClick={() => {
              onClickRedirect(`${EnumPath.STORE_DETAIL}/${dataItem.storeId}`);
            }}
            className='ls-cursor_pointer'
            style={{ color: 'blue' }}>
            <ins style={{ textDecoration: 'none' }}>{dataItem.storeId}</ins>
          </a>
        </CellRoot>
      ),
    },
    {
      field: 'name',
      filter: 'text',
      title: 'store.storeName',
    },
    {
      field: 'taxNumber',
      filter: 'text',
      title: 'taxNumber',
    },
    {
      field: 'shopName',
      filter: 'text',
      title: 'store.shopName',
    },
    {
      field: 'status',
      title: 'status',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const status: number = props.dataItem.status;
        return (
          <CellRoot>
            <ChipStatus status={status}>
              {<Localize tid={`store.list.${ENUM_PARSE_STATUS_STORE[status]}`} />}
            </ChipStatus>
          </CellRoot>
        );
      },
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      cell: ({ dataItem }) => <CellRoot>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
    },
    {
      field: 'createdAt',
      title: 'Action',
      cell: ({ dataItem }) => (
        <CellRoot>
          <a
            onClick={() => {
              onClickRedirect(`${EnumPath.STORE_UPDATE}/${dataItem.storeId}`);
            }}
            className='ls-cursor_pointer'
            style={{ color: 'blue' }}>
            <ins style={{ textDecoration: 'none' }}>Edit</ins>
          </a>
        </CellRoot>
      ),
    },
  ];
};
const ViewListStore: FunctionComponent<ViewProps> = props => {
  const { apiList, payload, onClickRedirect } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC(onClickRedirect);
  return (
    <React.Fragment>
      <WrapperMain>
        <TableRequest
          toolbar={FormToolbar}
          sortable
          payload={payload}
          apiList={apiList}
          gridColumns={gridColumns}
        />
      </WrapperMain>
    </React.Fragment>
  );
};

export default ViewListStore;
