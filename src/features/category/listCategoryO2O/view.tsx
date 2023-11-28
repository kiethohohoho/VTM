import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import TableCategory from '@/core2/table/tableCategory';

import { type IFilter } from './interface';

interface ViewProps {
  apiList: IApiRequest;
  payload: IFilter;
  listStore: IItemDataDropDown[] | [];
}

// const gridColumnsListCategoryFC = (): GridColumnProps[] => {
//   return [
//     {
//       field: '#',
//       width: '50',
//       cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
//     },
//     {
//       field: 'categoryInStoreId',
//       title: 'category.categoryInStoreId',
//       cell: ({ dataItem }) => {
//         return (
//           <CellRoot>
//             <Link
//               style={{ color: 'blue' }}
//               to={dataItem.categoryInStoreId}>
//               <ins style={{ textDecoration :'none' }}>{dataItem.categoryInStoreId}</ins>
//             </Link>
//           </CellRoot>
//         );
//       },
//     },
//     {
//       field: 'name',
//       filter: 'text',
//       title: 'category.name',
//     },
//     {
//       field: 'createdAt',
//       title: 'createdAt',
//       cell: ({ dataItem }) => <CellRoot>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
//     },
//   ];
// };

const ViewListCategory: FunctionComponent<ViewProps> = props => {
  const { listStore } = props;
  return (
    <CardPage>
      {listStore.length > 0 && (
        // <TableRequest
        //   toolbar={({ dataState, onDataStateChange }) => (
        //     <FormToolbar
        //       dataState={dataState}
        //       onDataStateChange={onDataStateChange}
        //       listStore={listStore}
        //     />
        //   )}
        //   sortable
        //   payload={{ ...payload, storeId: listStore[0]?.id }}
        //   apiList={apiList}
        //   gridColumns={gridColumns}
        //   customPayload={['storeId']}
        //   queryRequest
        // />
        <TableCategory listStore={listStore} />
      )}
    </CardPage>
  );
};

export default ViewListCategory;
