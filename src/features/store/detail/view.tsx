/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type FunctionComponent } from 'react';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { ENUM_PARSE_STATUS_STORE, ENUM_PARSE_STATUS_YES_NO, STATUS_STORE } from '@/utils/Enums';

import ChipStatus from '../../productInventory/components/chipStatus';
import { type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail | null;
  loading: boolean;
}

const View: FunctionComponent<ViewProps> = ({ detail, loading }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage
      // title={<Localize tid='store.detailTitle' />}
      // actionHeader={
      //   <ButtonRoot
      //     icon='edit'
      //     size='sm'
      //     bgColor='warning'
      //     fontColor='dark'
      //     onClick={() => {
      //       navigate(`${EnumPath.STORE_UPDATE}/${detail.storeId}`);
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
                label={'status'}
                content={
                  <ChipStatus status={detail.status}>
                    {LocalizeTypeFunc(`store.list.${ENUM_PARSE_STATUS_STORE[detail.status]}`)}
                  </ChipStatus>
                }
              />
              <ItemRoot
                label={'store.storeId'}
                content={detail.storeId}
              />
              <ItemRoot
                label={'store.storeName'}
                content={detail.name}
              />
              <ItemRoot
                label={'taxNumber'}
                content={detail.taxNumber}
              />
              {/* <ItemRoot
                label={'classification'}
                content={detail.classification}
              /> */}
              <ItemRoot
                label={'license'}
                content={detail.license}
              />
              <ItemRoot
                label={'address'}
                content={detail.address}
              />
              {/* <ItemRoot
                label={'cover'}
                content={detail.cover ? detail.cover : '-'}
              /> */}

              {/* <ItemRoot
                label={'photo'}
                content={detail.photo ? detail.photo : '-'}
              /> */}

              {/* <ItemRoot
                label={'modifiedAt'}
                content={Helper.formatDateFull(detail.modifiedAt)}
              /> */}

              {/* <ItemRoot
                label={'userId'}
                content={detail.userId}
              /> */}
              {detail.status === STATUS_STORE.WAITING && (
                <ItemRoot
                  label={'store.isOnline'}
                  content={<Localize tid={`store.detail.isOnline.${ENUM_PARSE_STATUS_YES_NO[detail.isOnline]}`} />}
                />
              )}

              <ItemRoot
                label={'store.shopName'}
                content={detail.shopName}
              />
              <ItemRoot
                label={'store.nameOwner'}
                content={detail.nameOwner}
              />
              <ItemRoot
                label={'store.residence'}
                content={detail.residence}
              />

              {/* <ItemRoot
                label={<Localize tid='description' />}
                content={detail.description}
              /> */}
            </article>
          </section>
        </section>
      </CardPage>
    )
  );
};

export default View;
