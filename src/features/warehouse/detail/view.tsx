import { type FunctionComponent } from 'react';

import { type IDialog } from '@/context/dialog/dialog.interface';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';

import { type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}

const View: FunctionComponent<ViewProps> = ({ detail, loading, handleUpdate, handleUpdateSuccess }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage
      // title={<Localize tid='warehouse.detailTitle' />}
      // actionHeader={
      //   <ButtonRoot
      //     icon='edit'
      //     size='sm'
      //     bgColor='warning'
      //     fontColor='dark'
      //     onClick={() => {
      //       handleUpdate({
      //         titleDialog: <Localize tid='warehouse.updateTitle' />,
      //         typeDialog: TYPE_DIALOG.UPDATE_WAREHOUSE,
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
                label={'store.storeId'}
                content={detail.storeId}
              />
              <ItemRoot
                label={'warehouse.name'}
                content={detail.name}
              />
              <ItemRoot
                label={'warehouse.address'}
                content={detail.address}
              />
            </article>
          </section>
        </section>
      </CardPage>
    )
  );
};

export default View;
