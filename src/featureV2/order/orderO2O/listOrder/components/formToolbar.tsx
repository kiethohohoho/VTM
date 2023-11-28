import { Form, FormElement } from '@progress/kendo-react-form';
import { useEffect, useState } from 'react';

import { InputRoot } from '@/core2/input';
import { type IListTabStatus, TabStatusTable } from '@/core2/table/components/tabStatusTable';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { useDebounce } from '@/hooks/useDebounce';
import { useFirstRender } from '@/hooks/useFirstRender';
import { OrderType, STATUS_ORDER, STATUS_ORDER_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

const listTabStatus: IListTabStatus = [
  {
    name: `order.status.${STATUS_ORDER_PARSE[STATUS_ORDER.TO_SHIP]}`,
    value: STATUS_ORDER.TO_SHIP,
  },
  {
    name: `order.status.${STATUS_ORDER_PARSE[STATUS_ORDER.SHIPPING]}`,
    value: STATUS_ORDER.SHIPPING,
  },
  {
    name: `order.status.${STATUS_ORDER_PARSE[STATUS_ORDER.COMPLETED]}`,
    value: STATUS_ORDER.COMPLETED,
  },
  {
    name: `order.status.${STATUS_ORDER_PARSE[STATUS_ORDER.CANCELED]}`,
    value: STATUS_ORDER.CANCELED,
  },
  {
    name: `order.status.${STATUS_ORDER_PARSE[STATUS_ORDER.RETURN_REFUND]}`,
    value: STATUS_ORDER.RETURN_REFUND,
  },
];

function FormToolbarListOrderO2O({ dataState, onDataStateChange }: IToolBarProps) {
  const [searchValue, setSearchValue] = useState<string>();
  const firstRender = useFirstRender();
  const debounceSearchValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!firstRender) {
      const newDataState: IState = {
        ...dataState,
      };
      if (Helper.isEmpty(debounceSearchValue)) {
        newDataState.search = '';
        newDataState.searchValue = '';
      } else {
        newDataState.search = 'order.orderId';
        newDataState.searchValue = debounceSearchValue;
      }
      onDataStateChange(Helper.removeObjectEmpty(newDataState));
    }
  }, [debounceSearchValue]);

  const handleFilterOrderStatus = (filterValue?: number | string) => {
    onDataStateChange(
      Helper.removeObjectEmpty({
        ...dataState,
        fil: 'orderGroup.orderType',
        filterValue: OrderType.orderOnline,
        filter1: filterValue ? 'order.status' : '',
        filterValue1: filterValue?.toString(),
      }),
    );
  };

  return (
    <div className='px-10 pb-6'>
      <TabStatusTable
        listTabStatus={listTabStatus}
        currentStatus={dataState.filterValue1}
        handleFilterStatus={handleFilterOrderStatus}
      />
      <Form
        render={() => {
          return (
            <FormElement>
              <div className='flex justify-between'>
                <div className='w-80'>
                  <InputRoot
                    name='search'
                    id='search'
                    placeholder={'search'}
                    onChange={e => {
                      setSearchValue(e.target.value as string);
                    }}
                  />
                </div>
              </div>
            </FormElement>
          );
        }}
      />
    </div>
  );
}

export { FormToolbarListOrderO2O };
