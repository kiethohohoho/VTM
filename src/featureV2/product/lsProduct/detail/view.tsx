import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import CardPage from '@/core2/card/page';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

interface IViewDetailProduct {
  apiList: IApiRequest;
}
const gridColumnsFC = (): GridColumnProps[] => {
  const { onSetView } = useContext(ContextModal);
  const params = useParams();

  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'name',
      title: 'goods.name',
      filter: 'text',
    },
    {
      field: 'barcode',
      filter: 'text',
      title: 'barcode',
    },
    {
      field: 'sku',
      filter: 'text',
      title: 'sku',
    },
    {
      field: 'goodsModel',
      title: 'quantity',
      headerClassName: '!k-text-center',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          {Helper.isEmpty(dataItem.goodsModel) ? '-' : dataItem.goodsModel.quantityAvailable}
        </CellRoot>
      ),
    },
    {
      field: '',
      width: '200',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <ButtonRoot
            themeColor={'primary'}
            onClick={() => {
              onSetView({
                titleDialog: <Localize tid='product.importGoods' />,
                typeDialog: TYPE_DIALOG.IMPORT_GOODS,
                typeModel: TYPE_MODAL.CUSTOM,
                data: {
                  goods: dataItem,
                  productDictionaryId: params?.productDictionaryId,
                  storeId: params?.storeId,
                },
                onSubmit: () => null,
              });
            }}
            type='button'
            className='ls-w_36 ls-h_13'>
            <Localize tid={'product.importGoods'} />
          </ButtonRoot>
        </CellRoot>
      ),
    },
  ];
};
const ViewDetailProduct: FunctionComponent<IViewDetailProduct> = props => {
  const { apiList } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC();
  return (
    <CardPage
      title='product.detail'
      backPath={EnumPath.PRODUCT}>
      <TableRequest
        sortable
        apiList={apiList}
        gridColumns={gridColumns}
        payload={{}}
      />
    </CardPage>
  );
};

export { ViewDetailProduct };
