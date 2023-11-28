import { type GridColumnProps } from '@progress/kendo-react-grid';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import CardPage from '@/core2/card/page';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import AuthService from '@/utils/Auth';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { FormToolbarListConsumer } from './components/formToolbar';
interface IViewListConsumer {
  apiList: IApiRequest;
  payload: object;
}
const gridColumnsListConsumerFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'name',
      filter: 'text',
      title: 'name',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`${EnumPath.CONSUMER}/${dataItem.consumerId}`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.name}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'phone',
      filter: 'text',
      title: 'phone',
    },
    {
      field: 'registrationDate',
      title: 'createdAt',
      cell: ({ dataItem }) => <CellRoot>{Helper.formatDateFull(dataItem?.registrationDate)}</CellRoot>,
    },
  ];
};

const ViewListConsumer = (props: IViewListConsumer) => {
  const { apiList, payload } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListConsumerFC();
  const profileDetails = AuthService.getPackageProfile();
  return (
    <CardPage title='Consumer'>
      <TableRequest
        toolbar={({ dataState, onDataStateChange }) => (
          <FormToolbarListConsumer
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
    </CardPage>
  );
};

export { ViewListConsumer };
