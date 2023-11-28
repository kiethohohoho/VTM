import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { CellRoot } from '@/core2/table/components/cell';
import TableRequest from '@/core2/table/request';
import { getListStore } from '@/features/common/getListStore';
import { ENUM_PARSE_STATUS_GOODS, EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import ChipStatus from '../components/chipStatus';
import FormToolbar from './components/formToolbar';

interface ViewProps {
  apiList: IApiRequest;
  payload: object;
  onClickRedirect: (url: string) => void;
  storeId?: string | number;
  handleChangeStore: (storeId: string | number) => void;
}
const config = new Config().getState();

const gridColumnsFC = (onClickRedirect: (url: string) => void, storeId: string | number): GridColumnProps[] => {
  return [
    {
      field: '',
      width: '50',
      cell: ({ dataItem }) => {
        const imagesGoodFirst = JSON.parse(dataItem.images)[0];
        return (
          <CellRoot align='center'>
            <img
              src={`${config.api.static.host}${imagesGoodFirst}`}
              width={40}
              height={40}
              alt={dataItem.name}
            />
          </CellRoot>
        );
      },
    },
    {
      field: 'name',
      title: 'productInventory.name',
      filter: 'text',
      width: '150',
    },
    {
      field: 'description',
      title: 'description',
    },
    {
      field: 'status',
      title: 'status',
      width: '120',
      headerClassName: '!k-text-center',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const status: number = props.dataItem.status;
        return (
          <CellRoot align='center'>
            <ChipStatus status={status}>
              {<Localize tid={`goods.list.${ENUM_PARSE_STATUS_GOODS[status]}`} />}
            </ChipStatus>
          </CellRoot>
        );
      },
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      width: '120',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => <CellRoot align='center'>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
    },
    {
      field: '',
      title: '',
      headerClassName: '!k-text-center',
      width: '200',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <ButtonRoot
            icon='table'
            type='button'
            onClick={() => {
              onClickRedirect(`${EnumPath.PRODUCT_INVENTORY}/${dataItem.productDictionaryId}/${storeId}`);
            }}>
            <Localize tid='productInventory.viewGoods' />
          </ButtonRoot>
        </CellRoot>
      ),
    },
  ];
};
const ViewListProductDictionary: FunctionComponent<ViewProps> = props => {
  const { apiList, payload, onClickRedirect, storeId, handleChangeStore } = props;
  const { listStore } = getListStore();

  const gridColumns: GridColumnProps[] = gridColumnsFC(onClickRedirect, storeId || listStore[0]?.id);
  return (
    <CardPage>
      {listStore.length > 0 && (
        <TableRequest
          toolbar={({ dataState, onDataStateChange }) =>
            FormToolbar({ dataState, onDataStateChange, handleChangeStore })
          }
          sortable
          apiList={apiList}
          gridColumns={gridColumns}
          payload={{ ...payload, storeId: listStore[0]?.id }}
          queryRequest
          customPayload={['storeId']}
        />
      )}
    </CardPage>
  );
};

export default ViewListProductDictionary;
