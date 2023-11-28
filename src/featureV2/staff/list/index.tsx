import { type GridColumnProps } from '@progress/kendo-react-grid';
import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { type IDialog, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
// import { ChipStaffStatus } from '@/featureV2/components/chipStaffStatus';
// import { StatusStaffParse } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { FormToolbarListStaff } from '../components/formToolbarStaff';

interface IViewListStaff {
  apiList: IApiRequest;
  payload: object;
  selectGroup: IItemDataDropDown;
  keyView: string;
  onSetView: (parameter: IDialog) => void;
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
      title: 'fullName',
      filter: 'text',
      cell: ({ dataItem }) => {
        return <CellRoot>{dataItem.name}</CellRoot>;
      },
    },
    {
      field: 'phone',
      title: 'phoneNumber',
    },
    // {
    //   field: 'status',
    //   title: 'status',
    //   headerClassName: '!k-text-center',
    //   cell: ({ dataItem }) => {
    //     return (
    //       <CellRoot align='center'>
    //         <ChipStaffStatus status={dataItem.status}>
    //           <Localize tid={StatusStaffParse[dataItem.status]} />
    //         </ChipStaffStatus>
    //       </CellRoot>
    //     );
    //   },
    // },
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
                titleDialog: <Localize tid='staff.updateStaff' />,
                typeDialog: TYPE_DIALOG.UPDATE_STAFF,
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

const ViewListStaff = (props: IViewListStaff) => {
  const { apiList, payload, selectGroup, keyView, onSetView, setKey } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListFC(onSetView, setKey);

  return (
    <CardForm>
      {!Helper.isEmpty(selectGroup.id) && (
        <TableRequest
          toolbar={({ dataState, onDataStateChange }) => (
            <FormToolbarListStaff
              dataState={dataState}
              onDataStateChange={onDataStateChange}
            />
          )}
          key={keyView}
          sortable
          apiList={apiList}
          gridColumns={gridColumns}
          customPayload={['groupStaffId', 'queryRequest']}
          payload={{
            groupStaffId: selectGroup.id,
            queryRequest: payload,
          }}
        />
      )}
    </CardForm>
  );
};

export { ViewListStaff };
