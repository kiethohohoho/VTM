import './_index.scss';

import { orderBy, type SortDescriptor } from '@progress/kendo-data-query';
import { type PagerTargetEvent } from '@progress/kendo-react-data-tools';
import {
  Grid,
  GridColumn,
  type GridColumnProps,
  type GridPageChangeEvent,
  type GridProps,
  type GridSortChangeEvent,
} from '@progress/kendo-react-grid';
import React from 'react';

import { Localize, LocalizeTypeFunc } from '@/context/languages';

import dataDefault from './data.json';

interface IPageState {
  skip: number;
  take: number;
}
const initialPageState: IPageState = { skip: 0, take: 50 };
const initialSort: SortDescriptor[] = [{ field: 'ProductName', dir: 'asc' }];
const gridColumnsDefault: GridColumnProps[] = [
  {
    title: 'ID',
    field: 'ProductID',
  },
  {
    title: 'NAME',
    field: 'ProductName',
  },
  {
    title: 'CATEGORYNAME',
    field: 'Category.CategoryName',
  },
  {
    title: 'PRICE',
    field: 'UnitPrice',
  },
  {
    title: 'IN STOCK',
    field: 'UnitsInStock',
  },
];

interface ITableRoot extends GridProps {
  data?: any[];
  gridColumns?: GridColumnProps[];
  title?: string;
  isPageAble?: boolean;
}
const TableRoot: React.FC<ITableRoot> = ({
  data = dataDefault,
  gridColumns = gridColumnsDefault,
  sortable = false,
  sort = initialSort,
  pageable,
  isPageAble = true,
  title,
  className,
  ...other
}) => {
  const [page, setPage] = React.useState<IPageState>(initialPageState);
  const [pageSizeValue, setPageSizeValue] = React.useState<number>(50);
  const [sortState, setSortState] = React.useState(sort);

  const handlePageChange = (event: GridPageChangeEvent) => {
    const targetEvent = event.targetEvent as PagerTargetEvent;
    const take = targetEvent.value === 'All' ? data.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };
  const handleSortChange = (even: GridSortChangeEvent) => {
    setSortState(even.sort);
  };

  return (
    <div className='flex flex-column gap-5'>
      {title && (
        <div className='text-2xl font-bold'>
          <Localize tid={title} />
        </div>
      )}
      <Grid
        pageable={
          isPageAble && {
            buttonCount: 4,
            pageSizes: [30, 50, 100, 'All'],
            pageSizeValue,
          }
        }
        className={`tableRoot ${className}`}
        onPageChange={handlePageChange}
        skip={page.skip}
        take={page.take}
        total={data.length}
        sortable={sortable}
        sort={sortState}
        onSortChange={handleSortChange}
        data={orderBy(data, sortState).slice(page.skip, page.take + page.skip)}
        {...other}>
        {gridColumns.map((column, index) => {
          return (
            <GridColumn
              key={TableRoot.name + index.toString()}
              field={column.field}
              title={LocalizeTypeFunc(column.title || '')}
              className='h-6 bg-transparent'
              headerCell={() => {
                return LocalizeTypeFunc(column?.title || (column?.field as string));
              }}
              {...column}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default TableRoot;
