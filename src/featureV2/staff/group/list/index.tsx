import { type GridColumnProps } from '@progress/kendo-react-grid';

import { type IApiRequest } from '@/api/api.interface';
import { type IDialog, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm } from '@/core2/card';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { Helper } from '@/utils/Helper';

import { FormToolbarListGroup } from '../../components/formToolbarGroup';
interface IViewListGroup {
  apiList: IApiRequest;
  payload: object;
  onSetView: (parameter: IDialog) => void;
  onRequestSuccessListGroup?: (data: any) => void;
  setKey: any;
}

const gridColumnsListFC = (onSetView: (parameter: IDialog) => void, setKey: any): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'name',
      title: 'groupStaff.groupStaffName',
      filter: 'text',
      cell: ({ dataItem }) => {
        return <CellRoot>{dataItem.name}</CellRoot>;
      },
    },
    {
      field: 'storeId',
      title: 'store.storeId',
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => <CellRoot align='center'>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
    },
    {
      field: 'createdAt',
      title: 'Action',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <ButtonRoot
            themeColor='info'
            size='small'
            onClick={() => {
              onSetView({
                titleDialog: <Localize tid='groupStaff.updateTitle' />,
                typeDialog: TYPE_DIALOG.UPDATE_GROUP_STAFF,
                typeModel: TYPE_MODAL.CUSTOM,
                data: { detail: dataItem },
                onSubmit: () => {
                  setKey(Helper.randomKey());
                },
              });
            }}>
            <span className='k-icon k-i-edit k-i-pencil' />
          </ButtonRoot>
        </CellRoot>
      ),
    },
  ];
};

const ViewListGroup = (props: IViewListGroup) => {
  const { setKey, apiList, payload, onRequestSuccessListGroup, onSetView } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListFC(onSetView, setKey);

  return (
    <CardForm>
      <TableRequest
        onRequestSuccess={onRequestSuccessListGroup}
        toolbar={({ dataState, onDataStateChange }) => (
          <FormToolbarListGroup
            dataState={dataState}
            onDataStateChange={onDataStateChange}
          />
        )}
        sortable
        apiList={apiList}
        gridColumns={gridColumns}
        payload={payload}
        queryRequest={true}
      />
    </CardForm>
  );
};

export { ViewListGroup };
