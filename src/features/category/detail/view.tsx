import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { type IDialog } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';

import { type IParamsApiInStore, type IPayloadApiO2O, type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail | null;
  loadingDetail: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
  apiListProduct: IApiRequest | null;
  paramApi: IParamsApiInStore | null;
  payloadApi: IPayloadApiO2O | null;
  customPayload: string[];
}
const gridColumnsListProductCategoryInStoreFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'name',
      filter: 'text',
      title: 'category.name',
    },
    {
      field: 'barcode',
      filter: 'text',
      title: 'category.barcode',
    },
    {
      field: 'price',
      filter: 'text',
      title: 'category.price',
    },
  ];
};

const View: FunctionComponent<ViewProps> = ({
  detail,
  loadingDetail,
  handleUpdate,
  handleUpdateSuccess,
  apiListProduct,
  paramApi,
  payloadApi,
  customPayload,
}) => {
  return (
    <>
      {loadingDetail ? (
        <LoaderRoot />
      ) : (
        detail && (
          <CardPage
          // title={<Localize tid='categoryInStore.detailTitle' />}
          // actionHeader={
          //   <ButtonRoot
          //     icon='edit'
          //     bgColor='warning'
          //     fontColor='dark'
          //     onClick={() => {
          //       handleUpdate({
          //         titleDialog: <Localize tid='category.updateTitle' />,
          //         typeDialog: TYPE_DIALOG.UPDATE_CATEGORY,
          //         typeModel: TYPE_MODAL.CUSTOM,
          //         data: { detail },
          //         onSubmit: () => {
          //           handleUpdateSuccess();
          //         },
          //       });
          //     }}
          //     rounded='md'>
          //     <span className='ls-p_medium'>
          //       <Localize tid='update' />
          //     </span>
          //   </ButtonRoot>
          // }
          >
            <section className='ls-flex ls-flex-col ls-gap_3'>
              <section className='ls-px_larger'>
                <article className='ls-py_larger ls-flex ls-flex-col ls-gap_2'>
                  <ItemRoot
                    label={'category.categoryInStoreId'}
                    content={detail.categoryInStoreId}
                  />
                  <ItemRoot
                    label={'category.name'}
                    content={detail.name}
                  />
                  <ItemRoot
                    label={'store.storeId'}
                    content={detail.storeId}
                  />
                </article>
              </section>
            </section>
          </CardPage>
        )
      )}
      {(paramApi || payloadApi) && customPayload.length > 0 && apiListProduct && (
        <CardPage>
          <Localize tid={paramApi ? 'categoryInStore.listProduct' : 'categoryO2O.listProduct'} />
          <section>
            <TableRequest
              apiList={apiListProduct}
              sortable
              gridColumns={gridColumnsListProductCategoryInStoreFC()}
              payload={payloadApi}
              params={paramApi}
              customPayload={customPayload}
            />
          </section>
        </CardPage>
      )}
    </>
  );
};

export default View;
