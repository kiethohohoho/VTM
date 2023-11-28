import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Config from '@/Config';
import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { LoaderRoot } from '@/core2/loader';
import { EnumPath, STATUS_ORDER, STATUS_ORDER_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import { type IOrderItem } from '../interface';
interface IOrderListView {
  orderList: IOrderItem[];
  isLoading: boolean;
  handleUpdateSuccess: () => void;
  storeId: string;
}
const config = new Config().getState();
function OrderListView(props: IOrderListView) {
  const navigate = useNavigate();
  const { orderList, isLoading, handleUpdateSuccess, storeId } = props;
  const { onSetView } = useContext(ContextModal);
  return (
    <Fragment>
      {!isLoading ? (
        <>
          {orderList.length > 0 ? (
            orderList.map(order => (
              <CardPage
                key={order.orderId}
                className='ls-mt_sm'>
                <div
                  className='ls-flex ls-justify_between ls-pb_sm'
                  style={{
                    borderBottom: '1px solid rgb(214 211 209)',
                  }}>
                  <p>
                    <Localize tid={`order.status.${STATUS_ORDER_PARSE[order.orderStatus]}`} />
                  </p>
                  <p>{Helper.convertToDate(order.orderDate).toLocaleString()}</p>
                </div>
                <div>
                  {order.listOrderGoods.map(goods => (
                    <div
                      className='ls-flex ls-p_sm'
                      style={{
                        borderBottom: '1px solid rgb(214 211 209)',
                      }}
                      key={goods.goodsId}>
                      <div>
                        <img
                          width={75}
                          height={75}
                          src={`${config.api.static.host}${
                            Helper.isJson(goods.image) ? JSON.parse(goods.image)[0] : goods.image
                          }`}
                        />
                      </div>
                      <div className='ls-flex_1 ls-mx_sm ls-pt_xs'>
                        <b>
                          {goods.name}
                          {goods.variation && <span>{` (${goods.variation})`}</span>}
                        </b>
                        <p className='my-2'>x{goods.quantity}</p>
                      </div>
                      <div className='flex items-center'>
                        <p>{`${Number(goods.price) * goods.quantity}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='ls-flex ls-justify_end ls-p_xs'>
                  <div className='ls-flex ls-flex-col'>
                    <div className='ls-flex ls-justify_end'>
                      <p>
                        <Localize tid={'order.amount'} />: <span>{order.orderValue}</span>
                      </p>
                    </div>
                    <div className='ls-flex ls-justify_end ls-gap_2'>
                      <ButtonRoot
                        onClick={() => {
                          navigate(`${EnumPath.ORDER_O2O}/${order.orderId}`);
                        }}>
                        <Localize tid='order.seeDetailBtn' />
                      </ButtonRoot>
                      {order.orderStatus === STATUS_ORDER.PACKED && (
                        <ButtonRoot
                          onClick={() => {
                            onSetView({
                              titleDialog: <Localize tid='device.updateStatusTitle' />,
                              typeDialog: TYPE_DIALOG.UPDATE_STATUS_ORDER_O2O,
                              typeModel: TYPE_MODAL.CUSTOM,
                              data: { order, storeId },
                              onSubmit: () => {
                                handleUpdateSuccess();
                              },
                            });
                          }}>
                          <Localize tid='order.updateStatus' />
                        </ButtonRoot>
                      )}
                    </div>
                  </div>
                </div>
              </CardPage>
            ))
          ) : (
            <CardPage>
              <div className='ls-flex ls-flex-col '>
                <p className='text-center text-red-700'>
                  <Localize tid={'order.nodata'} />
                </p>
              </div>
            </CardPage>
          )}
        </>
      ) : (
        <LoaderRoot />
      )}
    </Fragment>
  );
}

export default OrderListView;
