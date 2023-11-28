import { type GridColumnProps } from '@progress/kendo-react-grid';
import React, { type FunctionComponent } from 'react';

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
      field: 'groupStaffId',
      title: 'groupStaff.groupStaffId',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <a
              onClick={() => {
                onClickRedirect(`${EnumPath.GROUP_STAFF_DETAIL}/${dataItem.groupStaffId}`);
              }}
              className='ls-cursor_pointer'
              style={{ color: 'blue' }}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.groupStaffId}</ins>
            </a>
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      filter: 'text',
      title: 'groupStaff.groupStaffName',
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

const ViewListGroup: FunctionComponent<ViewProps> = props => {
  const { apiList, payload, onClickRedirect } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC(onClickRedirect);
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

export default ViewListGroup;
