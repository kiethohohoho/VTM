import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { LoaderRoot } from '@/core2/loader';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import FormToolbarCategoryInStore, {
  type PayloadFilter,
} from '@/features/category/listCategoryO2O/components/formToolbar';
import AuthService from '@/utils/Auth';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import PaginationComponent from './components/pagination';
import RowLayer1Component from './components/rowLayer1';
interface ITableCategory {
  listStore: IItemDataDropDown[];
}

const config = new Config().getState();
const apiRequest = () => {
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'delete',
    url: config.api.lsProduct.category.categoryO2o._,
    headers: {
      token: auth.token,
    },
  };
  return api;
};

export interface ICategory {
  categoryId: string;
  code: string;
  image: string;
  layer: number;
  modifiedAt: number;
  modifiedBy: string;
  name: string;
  slug: string;
  status: number;
  subCategoryList: ICategory[];
}

interface ITableCategoryState {
  categories: ICategory[];
  result: any;
  idLayer0: string;
  idLayer1: string;
  pagination: {
    from: number;
    take: number;
  };
  payload: PayloadFilter;
}

interface IRowHead {
  label: string;
  filed: string;
}

const initialStateTableCategory: ITableCategoryState = {
  categories: [],
  result: [],
  idLayer0: '',
  idLayer1: '',
  pagination: {
    from: 0,
    take: 50,
  },
  payload: {
    order: Order.CREATED_AT,
    by: OrderBy.DESC,
    from: From.DEFAULT,
    limit: Limit.DEFAULT,
    storeId: '',
  },
};

const rowHead: IRowHead[] = [
  {
    label: 'category.name',
    filed: 'name',
  },
  {
    label: 'category.code',
    filed: 'code',
  },
];
const TableCategory: React.FC<ITableCategory> = ({ listStore }) => {
  initialStateTableCategory.payload.storeId = listStore[0].id as string;
  const [state, setState] = useState<ITableCategoryState>(initialStateTableCategory);
  // const { onSetView, status } = useContext(ContextModal);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        const resultData = Helper.getDataForTakePage(state.pagination.take, state.pagination.from, data);
        setState({
          ...state,
          categories: data,
          result: resultData,
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
      ...apiRequest(),
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
    const prevForm = state.pagination.from - 1;
    const newDataResult = Helper.getDataForTakePage(state.pagination.take, prevForm, state.categories);
    if (Helper.equalNumberAndConditionNumber(prevForm, -1)) {
      setState({
        ...state,
        result: newDataResult,
        pagination: {
          ...state.pagination,
          from: prevForm,
        },
      });
    }
  };
  const handleNextPage = () => {
    const nextForm = state.pagination.from + 1;
    const lengthPage = Math.ceil(state.categories.length / state.pagination.take);
    const newDataResult = Helper.getDataForTakePage(state.pagination.take, nextForm, state.categories);
    if (!Helper.equalNumberAndConditionNumber(nextForm, lengthPage - 1)) {
      setState({
        ...state,
        result: newDataResult,
        pagination: {
          ...state.pagination,
          from: nextForm,
        },
      });
    }
  };
  const handleFirstPage = () => {
    const newDataResult = Helper.getDataForTakePage(state.pagination.take, 0, state.categories);
    setState({
      ...state,
      result: newDataResult,
      pagination: {
        ...state.pagination,
        from: 0,
      },
    });
  };
  const handleLastPage = () => {
    const numberOfPages = Math.floor(state.categories.length / state.pagination.take);
    const newDataResult = Helper.getDataForTakePage(state.pagination.take, numberOfPages, state.categories);
    setState({
      ...state,
      result: newDataResult,
      pagination: {
        ...state.pagination,
        from: numberOfPages,
      },
    });
  };
  const handleTakePage = (event: DropDownListChangeEvent) => {
    const newDataResult = Helper.getDataForTakePage(event.target.value, 0, state.categories);
    setState({
      ...state,
      result: newDataResult,
      pagination: {
        ...state.pagination,
        take: event.target.value,
        from: 0,
      },
    });
  };
  const handleChangePage = (index: number) => {
    const newDataResult = Helper.getDataForTakePage(state.pagination.take, index, state.categories);
    setState({
      ...state,
      result: newDataResult,
      pagination: {
        ...state.pagination,
        from: index,
      },
    });
  };

  useEffect(() => {
    // if (status === STATUS_MODAL.SUCCESS) {
    //   refetch();
    // }
    refetch();
  }, [state.payload.search, state.payload.searchValue, state.payload.storeId]);
  const onDataStateChange = (val: PayloadFilter) => {
    setState(s => ({ ...s, payload: val }));
  };
  return (
    <section className='ls-bg_white ls-boxS_8 ls-rounded_xl'>
      <article className='ls-flex ls-flex-col ls-gap_2 ls-bd_b ls-bd_light-semi'>
        <div className='ls-text_xl ls-p_larger'>
          <FormToolbarCategoryInStore
            dataState={state.payload}
            onDataStateChange={onDataStateChange}
            listStore={listStore}
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
            <div className='ls-grid ls-grid-col-2 ls-w_full'>
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
          {state.result.map((category: any, index: number) => {
            return (
              <RowLayer1Component
                idLayer0Extend={state.idLayer0}
                idLayer1Extend={state.idLayer1}
                onGetIdLayer0={handleGetIdLayer0}
                onGetIdLayer1={handleGetIdLayer1}
                index={index + state.pagination.take * state.pagination.from}
                category={category}
                key={RowLayer1Component.name + index.toString()}
                storeId={state.payload.storeId}
              />
            );
          })}
          <article className='ls-p_larger'>
            <PaginationComponent
              onChangePage={handleChangePage}
              pagination={state.pagination}
              onFirstPage={handleFirstPage}
              onLastPage={handleLastPage}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onTakePage={handleTakePage}
              length={state.categories.length}
            />
          </article>
        </React.Fragment>
      )}
    </section>
  );
};

export default TableCategory;
