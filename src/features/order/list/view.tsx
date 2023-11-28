import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { type IDialog } from '@/context/dialog/dialog.interface';
import { CardPage } from '@/core2/card';

import TableOrder from './tableOrders';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}

const ViewListOrder: FunctionComponent<ViewProps> = props => {
  const { apiList } = props;
  return (
    <CardPage>
      <TableOrder apiList={apiList} />
    </CardPage>
  );
};

export default ViewListOrder;
