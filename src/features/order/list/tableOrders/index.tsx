import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import { LoaderRoot } from '@/core2/loader';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { From, Limit, Order, OrderBy, type STATUS_ORDER } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import FormToolbarOrder from '../components/formToolbar';
import { type IFilter } from '../interface';
import PaginationComponent from './components/pagination';
import RowLayer1Component from './components/rowLayer1';
interface ITableOrder {
  apiList: IApiRequest;
}

export interface IOrderGroup {
  orderGroupId: string;
  orderDate: number;
  orderType: string;
  orders: IOrder;
}
export interface IOrder {
  orderId: string;
  status: STATUS_ORDER;
  storeId: string;
  totalPrice: string;
  listOrderGoods: IListOrderGoods[];
}
export interface IListOrderGoods {
  goodsId: string;
  name: string;
  price: string;
  productDictionaryVariantDetailIdList: string;
  quantity: number;
}
interface ITableOrderState {
  result: any;
  idLayer0: string;
  idLayer1: string;
  currentPage: number;
  numberOfPages: number;
  payload: IFilter;
}

interface IRowHead {
  label: string;
  field: string;
}

const initialStateTableOrder: ITableOrderState = {
  result: [],
  idLayer0: '',
  idLayer1: '',
  currentPage: 1,
  numberOfPages: 0,
  payload: {
    order: Order.CREATED_AT,
    by: OrderBy.DESC,
    from: From.DEFAULT,
    limit: Limit.DEFAULT,
  },
};

const rowHead: IRowHead[] = [
  {
    label: 'order.orderGroupId',
    field: 'orderGroupId',
  },
  {
    label: 'order.orderDate',
    field: 'orderDate',
  },
  {
    label: 'order.orderType',
    field: 'orderType',
  },
];
const TableOrder: React.FC<ITableOrder> = ({ apiList }) => {
  const [state, setState] = useState<ITableOrderState>(initialStateTableOrder);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        let { numberOfPages, payload } = state;
        numberOfPages = Math.ceil(data.total / payload.limit);
        setState({
          ...state,
          result: data,
          numberOfPages,
        });
      } catch (error: any) {
        LoggerService.error('Table category execute handleRequestSuccess', error.toString());
      }
    },
    handleRequestError: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, 'An unknown error');
      } catch (error: any) {
        LoggerService.error('Table category execute handleRequestError', error.toString());
      }
    },
  };

  const { isFetching, refetch } = useGet(
    {
      ...apiList,
      payload: {
        ...state.payload,
      },
    },
    funcRequest,
  );

  const handleGetIdLayer0 = (idLayer0: string) => {
    if (Helper.equalTwoIdCategory(idLayer0, state.idLayer0)) {
      setState({
        ...state,
        idLayer0: '',
        idLayer1: '',
      });
    } else {
      setState({
        ...state,
        idLayer0,
      });
    }
  };
  const handleGetIdLayer1 = (idLayer1: string) => {
    if (Helper.equalTwoIdCategory(idLayer1, state.idLayer1)) {
      setState({
        ...state,
        idLayer1: '',
      });
    } else {
      setState({
        ...state,
        idLayer1,
      });
    }
  };
  const handlePrevPage = () => {
    let { payload, currentPage } = state;
    if (currentPage > 1) {
      currentPage -= 1;
      payload.from = currentPage * payload.limit;
      setState(s => ({ ...s, payload, currentPage }));
    }
  };
  const handleNextPage = () => {
    let { payload, currentPage, numberOfPages } = state;
    if (currentPage < numberOfPages) {
      currentPage += 1;
      payload.from = currentPage * payload.limit;
      setState(s => ({ ...s, payload, currentPage }));
    }
  };
  const handleFirstPage = () => {
    let { payload, currentPage } = state;
    if (currentPage > 1) {
      currentPage = 1;
      payload.from = currentPage * payload.limit;
      setState(s => ({ ...s, payload, currentPage }));
    }
  };
  const handleLastPage = () => {
    let { payload, currentPage, numberOfPages } = state;
    if (currentPage < numberOfPages) {
      currentPage = numberOfPages;
      payload.from = currentPage * payload.limit;
      setState(s => ({ ...s, payload, currentPage }));
    }
  };
  const handleTakePage = (event: DropDownListChangeEvent) => {
    let { payload, currentPage } = state;
    currentPage = 1;
    payload.from = From.DEFAULT;
    payload.limit = event.value;
    setState(s => ({ ...s, payload, currentPage }));
  };
  const handleChangePage = (page: number) => {
    let { payload, currentPage } = state;
    if (currentPage !== page) {
      currentPage = page;
      payload.from = payload.limit * page;
      setState(s => ({ ...s, payload, currentPage }));
    }
  };

  useEffect(() => {
    // if (status === STATUS_MODAL.SUCCESS) {
    //   refetch();
    // }
    refetch();
  }, [state.payload.from, state.payload.limit]);
  const onDataStateChange = () => {};
  return (
    <section className='ls-bg_white ls-boxS_8 ls-rounded_xl'>
      <article className='ls-flex ls-flex-col ls-gap_2 ls-bd_b ls-bd_light-semi'>
        <div className='ls-text_xl ls-p_larger'>
          <FormToolbarOrder
            dataState={{}}
            onDataStateChange={onDataStateChange}
          />
        </div>
      </article>
      {isFetching ? (
        <LoaderRoot />
      ) : (
        <React.Fragment>
          <article className='ls-flex ls-h_10 ls-items_center ls-bd_b ls-bd_secondary'>
            <div
              style={{
                color: '#637381',
              }}
              className='ls-w_20 ls-text_align-center'>
              #
            </div>
            <div className={`ls-grid ls-grid-col-${rowHead.length} ls-w_full`}>
              {rowHead.map((row, index) => {
                return (
                  <div
                    style={{
                      color: '#637381',
                    }}
                    key={'CategoryTable' + index.toString() + row.label}>
                    <Localize tid={row.label} />
                  </div>
                );
              })}
            </div>
            <div className='ls-w_10 ls-text_align-center'></div>
          </article>
          {state.result.list.map((groupOrder: any, index: number) => {
            return (
              <RowLayer1Component
                idLayer0Extend={state.idLayer0}
                idLayer1Extend={state.idLayer1}
                onGetIdLayer0={handleGetIdLayer0}
                onGetIdLayer1={handleGetIdLayer1}
                index={index + state.payload.limit * state.payload.from}
                groupOrder={groupOrder}
                key={RowLayer1Component.name + index.toString()}
              />
            );
          })}
          <article className='ls-p_larger'>
            <PaginationComponent
              onChangePage={handleChangePage}
              currentPage={state.currentPage}
              numberOfPages={state.numberOfPages}
              onFirstPage={handleFirstPage}
              onLastPage={handleLastPage}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onTakePage={handleTakePage}
              total={state.result.total}
              from={state.payload.from + 1}
              length={state.result.list.length}
              take={state.payload.limit}
            />
          </article>
        </React.Fragment>
      )}
    </section>
  );
};

export default TableOrder;
