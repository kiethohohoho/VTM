import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { LoaderRoot } from '@/core2/loader';
import { TableRoot } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { type STATUS_ACCOUNT, STATUS_ACCOUNT_PARSE, type STATUS_APPROVE, STATUS_APPROVE_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import ChipStatusApprove from '../components/approve';
import ChipStatusStaff from '../components/status';
import { type IListItem } from './component';
interface ViewProps {
  list: IListItem[] | undefined;
  loading: boolean | undefined;
  params: any;
  onClickRedirect: (url: string) => void;
}
const gridColumnsFC = (onClickRedirect: (url: string) => void): GridColumnProps[] => {
  return [
    {
      title: '#',
      width: 50,
      field: '#',
      cell: ({ dataIndex }) => {
        return <CellRoot>{dataIndex + 1}</CellRoot>;
      },
    },
    {
      title: 'userId',
      field: 'userId',
    },
    {
      title: 'fullName',
      field: 'name',
    },
    {
      title: 'phoneNumber',
      field: 'phone',
    },
    {
      field: 'isApproved',
      filter: 'text',
      title: 'staff.list.fieldIsApproved',
      cell: ({ dataItem }) => {
        const status: STATUS_APPROVE = dataItem.isApproved;

        return (
          <CellRoot>
            <ChipStatusApprove status={status}>
              <Localize tid={`staff.isApproved.${STATUS_APPROVE_PARSE[status]}`} />
            </ChipStatusApprove>
          </CellRoot>
        );
      },
    },
    {
      field: 'status',
      filter: 'text',
      title: 'status',
      cell: ({ dataItem }) => {
        const status: STATUS_ACCOUNT = dataItem.status;

        return (
          <CellRoot>
            <ChipStatusStaff status={status}>
              <Localize tid={`staff.status.${STATUS_ACCOUNT_PARSE[status]}`} />{' '}
            </ChipStatusStaff>
          </CellRoot>
        );
      },
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        return <td>{Helper.formatDateFull(props?.dataItem?.createdAt)}</td>;
      },
    },
  ];
};
const View: FunctionComponent<ViewProps> = props => {
  const { list, loading, onClickRedirect } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC(onClickRedirect);
  return (
    <CardPage
    // actionHeader={
    //   <ButtonRoot
    //     icon='plus'
    //     bgColor='info'
    //     onClick={() => {
    //       onClickRedirect(`${EnumPath.GROUP_STAFF_INVITE_STAFF}/${params?.groupStaffId}`);
    //     }}>
    //     <span className='ls-p_medium'>
    //       <Localize tid='groupStaff.inviteStaff' />
    //     </span>
    //   </ButtonRoot>
    // }
    >
      {!loading && list ? (
        <TableRoot
          sortable
          data={list}
          gridColumns={gridColumns}
        />
      ) : (
        <LoaderRoot />
      )}
    </CardPage>
  );
};

export default View;
