import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import FormToolbar from './components/formToolbar';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
  listStore: IItemDataDropDown[];
  isLoading: boolean;
}

const gridColumnsListConsumerFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'consumerId',
      title: 'consumer.consumerId',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`${EnumPath.CONSUMER}/${dataItem.consumerId}`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.consumerId}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      filter: 'text',
      title: 'consumer.name',
    },
    {
      field: 'phone',
      filter: 'text',
      title: 'consumer.phone',
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

const ViewListConsumer: FunctionComponent<ViewProps> = props => {
  const { apiList, payload, listStore } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListConsumerFC();
  return (
    <CardPage>
      {listStore.length > 0 && (
        <TableRequest
          toolbar={({ dataState, onDataStateChange }) => (
            <FormToolbar
              dataState={dataState}
              onDataStateChange={onDataStateChange}
              listStore={listStore}
            />
          )}
          sortable
          apiList={apiList}
          gridColumns={gridColumns}
          payload={{ ...payload, storeId: listStore[0]?.id }}
          queryRequest={true}
          customPayload={['storeId']}
        />
      )}
    </CardPage>
  );
};

export default ViewListConsumer;
