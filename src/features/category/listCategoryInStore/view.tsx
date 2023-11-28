import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { CellRoot } from '@/core2/table/components/cell';
import TableRequest from '@/core2/table/request';

import FormToolbar from './components/formToolbar';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
  listStore: IItemDataDropDown[] | [];
}

const gridColumnsListCategoryFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'categoryInStoreId',
      title: 'category.categoryInStoreId',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={dataItem.categoryInStoreId}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.categoryInStoreId}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      filter: 'text',
      title: 'category.name',
    },
  ];
};

const ViewListCategory: FunctionComponent<ViewProps> = props => {
  const { apiList, payload, listStore } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListCategoryFC();
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
          payload={{ ...payload, storeId: listStore[0]?.id }}
          apiList={apiList}
          gridColumns={gridColumns}
          customPayload={['storeId']}
          queryRequest
        />
      )}
    </CardPage>
  );
};

export default ViewListCategory;
