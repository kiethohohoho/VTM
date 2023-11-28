import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ContextModal } from '@/context/dialog';
import { type IDialog, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { TableRoot } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { Helper } from '@/utils/Helper';

import { type ISKUModel } from './types';

interface ViewProps {
  listSKU: ISKUModel[];
  handleUpdate: (parameter: IDialog) => void;
  isLoadingSearchBarcode: boolean;
}
const gridColumnsFC = (handleUpdate: (parameter: IDialog) => void): GridColumnProps[] => {
  const { onSetView } = useContext(ContextModal);
  const params = useParams();
  return [
    {
      field: '',
      width: '120',
      cell: ({ dataItem }) => (
        <CellRoot align='center'>
          <img
            src='https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg'
            width={40}
            height={40}
            alt={dataItem.name}
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
            onClick={() => {
              onSetView({
                titleDialog: <Localize tid='productInventory.importGoods' />,
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
            <Localize tid={'productInventory.importMoreGood'} />
          </ButtonRoot>
        </CellRoot>
      ),
    },
  ];
};
const DetailProductInventoryView: FunctionComponent<ViewProps> = props => {
  const { listSKU, handleUpdate, isLoadingSearchBarcode } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC(handleUpdate);
  return (
    <CardPage>
      <section className='ls-pt_medium ls-profile-grid_col1-3'>
        <article className='ls-py_medium ls-mb_medium'>
          <h2>
            <Localize tid='productInventory.detail' />
          </h2>
        </article>
        {!isLoadingSearchBarcode && (
          <TableRoot
            sortable
            data={listSKU}
            gridColumns={gridColumns}
            className='ls-mt_larger'
          />
        )}
      </section>
    </CardPage>
  );
};

export default DetailProductInventoryView;
