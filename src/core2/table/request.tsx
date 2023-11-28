import './_index.scss';

import { type DataResult, process, type State } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';
import {
  getSelectedState,
  Grid,
  GridColumn,
  type GridColumnProps,
  type GridDataStateChangeEvent,
  type GridExpandChangeEvent,
  type GridHeaderSelectionChangeEvent,
  type GridProps,
  type GridSelectionChangeEvent,
} from '@progress/kendo-react-grid';
import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { LoaderRoot } from '../loader';

export interface IFilter {
  order: string;
  by: string;
  from: number;
  limit: number;
  filter?: string;
  filterValue?: string | number;
  search?: string | number;
  searchValue?: string;
}
export interface IToolBarProps {
  dataState: IState;
  onDataStateChange: (e: IState) => void;
  selectedDataId?: string[];
  selectedData?: Record<string, any>;
  setSelectedState?: (value: React.SetStateAction<Record<string, boolean | number[]>>) => void;
}
export interface IState extends State {
  fil?: string;
  filterValue?: string | number;
  filter1?: string;
  filterValue1?: string | number;
  filter2?: string;
  filterValue2?: string | number;
  filter3?: string;
  filterValue3?: string | number;
  filter4?: string;
  filterValue4?: string | number;
  filter5?: string;
  filterValue5?: string | number;
  search?: any;
  searchValue?: string;
  order?: string;
  by?: 'desc' | 'asc';
}
export interface ITableRequestProps extends GridProps {
  gridColumns: GridColumnProps[];
  apiList: Omit<IApiRequest, 'payload'>;
  onRequestSuccess?: (data: any) => void;
  onRequestFailed?: () => void;
  actionHeader?: React.ReactNode;
  loaderComponent?: JSX.Element;
  toolbar?: React.FC<IToolBarProps>;
  payload?: any;
  params?: any;
  customPayload?: string[];
  queryRequest?: boolean;
  enableQuery?: boolean;
  queryKey?: string[];
  primaryKey?: string;
}
const SELECTED_FIELD = 'selected';

type DataState = Record<string, any>;
const TableRequest: React.FC<ITableRequestProps> = ({
  className,
  gridColumns,
  apiList,
  onRequestSuccess,
  onRequestFailed,
  loaderComponent = <LoaderRoot />,
  toolbar,
  payload,
  selectable,
  params,
  queryKey,
  customPayload = [],
  queryRequest,
  enableQuery = true,
  primaryKey = '',
  ...other
}) => {
  const idGetter = getter(primaryKey);
  const queryProps = payload || params;
  const { from, limit, filter, ...rest } = queryProps;
  const initialPayload: IState = {
    skip: queryProps.from || queryProps.skip,
    take: queryProps.limit || queryProps.take,
    fil: filter,
    ...rest,
  };
  /* data table */
  const [dataState, setDataState] = useState<DataState & DataState>(initialPayload);
  const [dataResult, setDataResult] = React.useState<DataResult>({
    data: process([], dataState).data,
    total: 0,
  });
  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        const { filter, ...rest } = dataState;

        setDataResult({
          data: process(data.list || data, {
            ...rest,
            skip: 0,
          }).data,
          total: data.total || 0,
        });
        onRequestSuccess && onRequestSuccess(data);
      } catch (error: any) {}
    },
    handleRequestError: () => {
      try {
        onRequestFailed && onRequestFailed();
      } catch (error: any) {}
    },
  };

  const filterFields = {
    order: dataState.order,
    by: dataState.by,
    from: dataState.skip,
    limit: dataState.take,
    filter: dataState.fil,
    filterValue: dataState.filterValue,
    filter1: dataState.filter1,
    filterValue1: dataState.filterValue1,
    filter2: dataState.filter2,
    filterValue2: dataState.filterValue2,
    filter3: dataState.filter3,
    filterValue3: dataState.filterValue3,
    filter4: dataState.filter4,
    filterValue4: dataState.filterValue4,
    filter5: dataState.filter5,
    filterValue5: dataState.filterValue5,
    search: dataState.search,
    searchValue: dataState.searchValue,
  };
  const customFields = Helper.removeObjectEmpty({
    [customPayload[0]]: dataState[customPayload[0]],
    [customPayload[1]]: dataState[customPayload[1]],
    [customPayload[2]]: dataState[customPayload[2]],
  });
  const payloadGet = queryRequest
    ? {
        queryRequest: {
          ...filterFields,
        },
        ...customFields,
      }
    : {
        ...filterFields,
        ...customFields,
      };
  const requestData = payload
    ? {
        payload: {
          ...payloadGet,
        },
      }
    : {
        params: {
          ...payloadGet,
        },
      };

  const { refetch, isFetching, isLoading } = useGet(
    {
      ...apiList,
      ...requestData,
    },
    funcRequest,
    queryKey,
    enableQuery,
  );
  const dataStateChange = (event: GridDataStateChangeEvent) => {
    setDataResult(
      process(dataResult.data, {
        ...event.dataState,
        skip: 0,
      }),
    );
    setDataState({ ...dataState, ...event.dataState });
  };

  const handleToolBarChange = (data: IState & Record<string, any>) => {
    setDataState(data);
  };

  useEffect(() => {
    !isFetching && refetch();
  }, [
    dataState.skip,
    dataState.take,
    dataState.filterValue,
    dataState.filterValue1,
    dataState.filterValue2,
    dataState.filterValue3,
    dataState.filterValue4,
    dataState.filterValue5,
    dataState.fil,
    dataState.filter1,
    dataState.filter2,
    dataState.filter3,
    dataState.filter4,
    dataState.filter5,
    dataState.search,
    dataState.searchValue,
    dataState[customPayload[0]],
    dataState[customPayload[1]],
    dataState[customPayload[2]],
  ]);
  useEffect(() => {
    LoggerService.info('TableRequest executive useEffect because dataResult change');
    const itemsPerPage = Number(dataState.take);
    const isPageLargerThan1 = Number(dataState.skip) >= itemsPerPage;
    const isPageHasData = dataResult.data.length > 0;
    if (isPageLargerThan1 && !isPageHasData) {
      LoggerService.info('TableRequest has data grid page > 1 and this page no data');
      LoggerService.info('TableRequest executive useEffect reset to page 1 and refetch data');
      const totalPages = Math.ceil(dataResult.total / itemsPerPage);
      const lastPage = Math.max(totalPages - 1, 0);
      const newSkip = Math.max(lastPage * itemsPerPage, 0);
      setDataState({ ...dataState, skip: newSkip });
    }
  }, [dataResult]);

  const handleExpandChange = (event: GridExpandChangeEvent) => {
    const newData = dataResult.data.map((item: any) => {
      if (item[primaryKey] === event.dataItem[primaryKey]) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setDataResult({ ...dataResult, data: newData });
  };
  const [selectedState, setSelectedState] = React.useState<Record<string, boolean | number[]>>({});
  const onSelectionChange = React.useCallback(
    (event: GridSelectionChangeEvent) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: primaryKey,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState],
  );
  const onHeaderSelectionChange = React.useCallback((event: GridHeaderSelectionChangeEvent) => {
    const checkboxElement: any = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: any = {};

    event.dataItems.forEach(item => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const getSelectedDataId = React.useCallback((selectedState: Record<string, boolean | number[]>) => {
    return Object.keys(selectedState).filter(key => selectedState[key]);
  }, []);

  const getSelectedData = React.useCallback(
    (selectedState: Record<string, boolean | number[]>) => {
      return dataResult.data.filter(item => selectedState[item[primaryKey]]);
    },
    [dataResult.data],
  );
  return (
    <section>
      <article>
        {toolbar &&
          toolbar({
            dataState,
            onDataStateChange: handleToolBarChange,
            selectedDataId: getSelectedDataId(selectedState),
            selectedData: getSelectedData(selectedState),
            setSelectedState,
          })}
      </article>
      <article>
        {isLoading ? (
          <LoaderRoot />
        ) : (
          <div
            style={{
              borderTop: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0',
            }}
            className='bg-white px-10'>
            <Grid
              className={`table ${className}`}
              data={dataResult.data.map(item => ({
                ...item,
                [SELECTED_FIELD]: selectedState[idGetter(item)],
              }))}
              pageable={
                dataResult.total ? { pageSizes: [30, 50, 100], buttonCount: 4, pageSizeValue: dataState.take } : false
              }
              selectedField={SELECTED_FIELD}
              total={dataResult.total}
              skip={dataState.skip}
              take={dataState.take}
              selectable={selectable}
              onDataStateChange={dataStateChange}
              onExpandChange={handleExpandChange}
              sort={dataState.sort}
              onSelectionChange={onSelectionChange}
              onHeaderSelectionChange={onHeaderSelectionChange}
              {...other}>
              {selectable && (
                <GridColumn
                  field={SELECTED_FIELD}
                  width='50px'
                  className='!k-text-center'
                  headerSelectionValue={dataResult.data.findIndex((item: any) => !selectedState[idGetter(item)]) === -1}
                />
              )}
              {gridColumns.map((item, index) => (
                <GridColumn
                  key={index.toString()}
                  headerCell={() => {
                    return LocalizeTypeFunc(item?.title || (item?.field as string));
                  }}
                  {...item}
                />
              ))}
            </Grid>
          </div>
        )}
      </article>
    </section>
  );
};

export default TableRequest;
