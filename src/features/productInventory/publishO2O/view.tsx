import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import { type ChangeEvent, type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { CellRoot } from '@/core2/table/components/cell';
import TableRequest from '@/core2/table/request';
import { getListStore } from '@/features/common/getListStore';
import { ENUM_PARSE_PUBLISH_O2O, ENUM_PARSE_STATUS_GOODS, From, Limit, Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import ChipStatus from '../components/chipStatus';
import { ENUM_STATE_UPDATE_O2O } from './component';
import FormToolbar from './components/formToolbar';
import { type IFilter } from './interface';

interface ViewProps {
  apiList: IApiRequest;
  listGoodsUpdateStateO2O: string[];
  stateO2OFilter: string | number;
  onClickRedirect: (url: string) => void;
  handleChangeMode: (mode: number) => void;
  handleAddToListGoodsUpdateO2O: (goodsId: string) => void;
  handleRemoveFromListGoodsUpdateO2O: (goodId: string) => void;
  handleResetListGoodsUpdateO2O: () => void;
}

const payload: IFilter = {
  order: Order.CREATED_AT,
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const gridColumnsFC = (
  stateO2OFilter: string | number,
  listGoodsUpdateStateO2O: string[],
  handleAddToListGoodsUpdateO2O: (goodsId: string) => void,
  handleRemoveFromListGoodsUpdateO2O: (goodId: string) => void,
): GridColumnProps[] => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, goodId: any) => {
    const newCheckedValue = e.target.checked;
    if (newCheckedValue) {
      handleAddToListGoodsUpdateO2O(goodId);
    } else {
      handleRemoveFromListGoodsUpdateO2O(goodId);
    }
  };
  return [
    {
      field: '',
      width: stateO2OFilter === ENUM_STATE_UPDATE_O2O.UPDATE_O2O ? '50' : '0',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <input
            name='checkbox'
            type='checkbox'
            style={{ border: '1px solid black', margin: '0 auto' }}
            checked={listGoodsUpdateStateO2O.includes(dataItem.goodsId)}
            onChange={e => {
              handleCheckboxChange(e, dataItem.goodsId);
            }}
          />
        </CellRoot>
      ),
    },
    {
      field: '',
      width: '120',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <img
            src='https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg'
            width={40}
            height={40}
            alt={dataItem.image}
          />
        </CellRoot>
      ),
    },
    {
      field: 'name',
      title: 'productInventory.name',
      filter: 'text',
    },
    {
      field: 'sku',
      filter: 'text',
      title: 'sku',
    },
    {
      field: 'quantityAvailable',
      title: 'quantity',
      headerClassName: '!k-text-center',
      className: '!k-text-center',
      width: '100',
    },
    {
      field: 'status',
      title: 'status',
      headerClassName: '!k-text-center',
      width: '150',
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
      field: 'isO2O',
      title: 'In O2O',
      headerClassName: '!k-text-center',
      width: '150',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const isO2O: number = props.dataItem.isO2O;
        return (
          <CellRoot align='center'>
            <ChipStatus status={isO2O}>{<Localize tid={`goods.list.${ENUM_PARSE_PUBLISH_O2O[isO2O]}`} />}</ChipStatus>
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
  ];
};
const ViewPublishO2OList: FunctionComponent<ViewProps> = props => {
  const {
    apiList,
    handleChangeMode,
    stateO2OFilter,
    handleAddToListGoodsUpdateO2O,
    handleRemoveFromListGoodsUpdateO2O,
    handleResetListGoodsUpdateO2O,
    listGoodsUpdateStateO2O,
  } = props;
  const { listStore } = getListStore();
  const gridColumns: GridColumnProps[] = gridColumnsFC(
    stateO2OFilter,
    listGoodsUpdateStateO2O,
    handleAddToListGoodsUpdateO2O,
    handleRemoveFromListGoodsUpdateO2O,
  );
  return (
    <CardPage>
      {listStore.length > 0 && (
        <TableRequest
          toolbar={({ dataState, onDataStateChange }) =>
            FormToolbar({
              dataState,
              storeId: listStore[0]?.id,
              listGoodsUpdateStateO2O,
              onDataStateChange,
              handleChangeMode,
              handleResetListGoodsUpdateO2O,
            })
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

export default ViewPublishO2OList;
