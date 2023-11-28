import { type GridCellProps, type GridColumnProps } from '@progress/kendo-react-grid';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { ENUM_PARSE_PUBLISH_O2O, ENUM_PARSE_STATUS_GOODS, TypeFilterProduct } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { ChipProductStatus } from '../../../components/chipProductStatus';
import { FormToolbarListProduct } from './components/formToolbar';

interface IViewProduct {
  apiList: IApiRequest;
  payload: object;
}
const config = new Config().getState();

const gridColumnsListFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
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
      title: 'name',
      filter: 'text',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`#`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.name}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'description',
      title: 'description',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <div className='text-ellipsis overflow-hidden xl:h-20'>{dataItem.description}</div>
          </CellRoot>
        );
      },
    },
    {
      field: 'price',
      title: 'price',
      headerClassName: '!k-text-right',
      className: '!k-text-right',
    },
    {
      field: 'category',
      title: 'category',
      headerClassName: '!k-text-left',
      className: '!k-text-left',
    },
    {
      field: 'stock',
      title: 'stock',
      headerClassName: '!k-text-center',
      className: '!k-text-center',
    },
    {
      field: 'isO2O',
      title: 'isO2O',
      headerClassName: '!k-text-center',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const status: number = props.dataItem.isO2o;
        return (
          <CellRoot align='center'>
            <ChipProductStatus status={status}>
              {<Localize tid={`goods.list.${ENUM_PARSE_PUBLISH_O2O[status]}`} />}
            </ChipProductStatus>
          </CellRoot>
        );
      },
    },
    {
      field: 'status',
      title: 'status',
      headerClassName: '!k-text-center',
      cell: (props: React.PropsWithChildren<GridCellProps>) => {
        const status: number = props.dataItem.status;
        return (
          <CellRoot align='center'>
            <ChipProductStatus status={status}>
              {<Localize tid={`goods.list.${ENUM_PARSE_STATUS_GOODS[status]}`} />}
            </ChipProductStatus>
          </CellRoot>
        );
      },
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <div className='text-ellipsis overflow-hidden xl:h-20'>{Helper.formatDateFull(dataItem?.createdAt)}</div>
        </CellRoot>
      ),
    },
  ];
};

const ViewProduct = (props: IViewProduct) => {
  const { apiList, payload } = props;
  const gridColumns: GridColumnProps[] = gridColumnsListFC();

  return (
    <>
      <TableRequest
        toolbar={({ dataState, selectedDataId, selectedData, onDataStateChange, setSelectedState }) => {
          return (
            <FormToolbarListProduct
              dataState={dataState}
              onDataStateChange={onDataStateChange}
              selectedDataId={selectedDataId}
              setSelectedState={setSelectedState}
            />
          );
        }}
        sortable
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: 'multiple',
        }}
        apiList={apiList}
        gridColumns={gridColumns}
        payload={{ ...payload, typeProduct: TypeFilterProduct.productDictionary }}
        queryRequest={true}
        customPayload={['typeProduct']}
        primaryKey='goodsId'
      />
    </>
  );
};

export { ViewProduct };
