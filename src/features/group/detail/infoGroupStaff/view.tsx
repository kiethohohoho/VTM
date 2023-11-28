/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type FunctionComponent } from 'react';

import { type IDialog } from '@/context/dialog/dialog.interface';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { Helper } from '@/utils/Helper';

import { type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail;
  loading: boolean;
  onSetView: (parameter: IDialog) => void;
}

const View: FunctionComponent<ViewProps> = ({ detail, loading, onSetView }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    <CardPage
    // title={<Localize tid='groupStaff.detailTitle' />}
    // actionHeader={
    //   <ButtonRoot
    //     icon='edit'
    //     size='sm'
    //     bgColor='warning'
    //     fontColor='dark'
    //     onClick={() =>
    //       onSetView({
    //         titleDialog: <Localize tid='groupStaff.updateTitle' />,
    //         typeDialog: TYPE_DIALOG.UPDATE_GROUP_STAFF,
    //         typeModel: TYPE_MODAL.CUSTOM,
    //         data: { detail },
    //       })
    //     }
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
              label={'groupStaff.groupStaffId'}
              content={detail.groupStaffId}
            />
            <ItemRoot
              label={'groupStaff.groupStaffName'}
              content={detail.name}
            />
            <ItemRoot
              label={'store.storeId'}
              content={detail.storeId}
            />

            <ItemRoot
              label={'createdAt'}
              content={Helper.formatDateFull(detail.createdAt)}
            />
            <ItemRoot
              label={'modifiedAt'}
              content={Helper.formatDateFull(detail.modifiedAt)}
            />
          </article>
        </section>
      </section>
    </CardPage>
  );
};

export default View;
