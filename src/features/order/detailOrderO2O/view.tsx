import { type FunctionComponent } from 'react';

import Config from '@/Config';
import { type IDialog } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { Helper } from '@/utils/Helper';

import { type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}
const config = new Config().getState();
const View: FunctionComponent<ViewProps> = ({ detail, loading, handleUpdate, handleUpdateSuccess }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage
      // title={<Localize tid='orderO2O.detailTitle' />}
      // actionHeader={
      //   <ButtonRoot
      //     icon='edit'
      //     size='sm'
      //     bgColor='warning'
      //     fontColor='dark'
      //     onClick={() => {
      //       handleUpdate({
      //         titleDialog: <Localize tid='device.updateStatusTitle' />,
      //         typeDialog: TYPE_DIALOG.UPDATE_STATUS_DEVICE,
      //         typeModel: TYPE_MODAL.CUSTOM,
      //         data: { detail },
      //         onSubmit: () => {
      //           handleUpdateSuccess();
      //         },
      //       });
      //     }}
      //     rounded='md'
      //     disabled>
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
                label={'orderO2O.orderId'}
                content={detail.orderId}
              />
              <ItemRoot
                label={'orderO2O.consigneeName'}
                content={detail.consigneeName}
              />
              <ItemRoot
                label={'orderO2O.phone'}
                content={detail.phone}
              />
              <ItemRoot
                label={'orderO2O.address'}
                content={detail.address}
              />
              <ItemRoot
                label={'orderO2O.orderDate'}
                content={Helper.convertToDate(detail.orderDate).toLocaleString()}
              />
            </article>
            <h1>
              <Localize tid='orderO2O.listGoods' />
            </h1>
            <div className='ls-flex ls-gap_3 ls-bg_gray-400 ls-p_sm ls-rounded_lg'>
              <span style={{ minWidth: '75px' }}>
                <Localize tid='orderO2O.image' />
              </span>
              <span className='ls-flex_1'>
                <Localize tid='orderO2O.goodsId' />
              </span>
              <span className='ls-flex_1'>
                <Localize tid='orderO2O.name' />
              </span>
              <span style={{ minWidth: '75px' }}>
                <Localize tid='orderO2O.quantity' />
              </span>
              <span style={{ minWidth: '75px' }}>
                <Localize tid='orderO2O.price' />
              </span>
            </div>
            {detail.listOrderGoods.map(item => (
              <div
                key={item.goodsId}
                className='ls-flex ls-gap_3 ls-mt_sm'>
                <img
                  width={75}
                  height={75}
                  alt={item?.name}
                  src={`${config.api.static.host}${Helper.isJson(item.image) ? JSON.parse(item.image)[0] : item.image}`}
                />
                <span className='ls-flex_1'>{item.goodsId}</span>
                <span className='ls-flex_1'>{item.name}</span>
                <span style={{ minWidth: '75px' }}>{item.quantity}</span>
                <span style={{ minWidth: '75px' }}>{item.price}</span>
              </div>
            ))}
            <div className='ls-flex ls-justify_end'>
              <p>
                <Localize tid='orderO2O.totalAmount' />: <span>{detail.totalAmount}</span>
              </p>
            </div>
          </section>
        </section>
      </CardPage>
    )
  );
};

export default View;
