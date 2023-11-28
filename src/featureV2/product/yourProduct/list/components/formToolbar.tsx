import { Form, FormElement } from '@progress/kendo-react-form';
import { useEffect, useState } from 'react';

import { InputRoot } from '@/core2/input';
import { TabStatusTable } from '@/core2/table/components';
import { type IListTabStatus } from '@/core2/table/components/tabStatusTable';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import ButtonCreate from '@/featureV2/components/buttonCreate';
import { useDebounce } from '@/hooks/useDebounce';
import { useFirstRender } from '@/hooks/useFirstRender';
import { ENUM_PARSE_STATUS_PRODUCT_RETAILER, EnumPath, STATUS_PRODUCT_RETAILER } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

const listTabStatus: IListTabStatus = [
  {
    name: `retailerProduct.status.${ENUM_PARSE_STATUS_PRODUCT_RETAILER[STATUS_PRODUCT_RETAILER.APPROVED]}`,
    value: STATUS_PRODUCT_RETAILER.APPROVED,
  },
  {
    name: `retailerProduct.status.${ENUM_PARSE_STATUS_PRODUCT_RETAILER[STATUS_PRODUCT_RETAILER.PENDING_APPROVAL]}`,
    value: STATUS_PRODUCT_RETAILER.PENDING_APPROVAL,
  },
  {
    name: `retailerProduct.status.${ENUM_PARSE_STATUS_PRODUCT_RETAILER[STATUS_PRODUCT_RETAILER.REJECTED]}`,
    value: STATUS_PRODUCT_RETAILER.REJECTED,
  },
];

function FormToolbarListProduct({ dataState, onDataStateChange }: IToolBarProps) {
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
        newDataState.search = 'retailerProduct.retailerProductName';
        newDataState.searchValue = debounceSearchValue;
      }
      onDataStateChange(Helper.removeObjectEmpty(newDataState));
    }
  }, [debounceSearchValue]);

  const handleFilterProductStatus = (filterValue?: number | string) => {
    onDataStateChange(
      Helper.removeObjectEmpty({
        ...dataState,
        fil: !Helper.isEmpty(filterValue) ? 'goods.status' : '',
        filterValue: (filterValue as string).toString(),
      }),
    );
  };
  return (
    <div className='px-10 pb-6'>
      <TabStatusTable
        listTabStatus={listTabStatus}
        currentStatus={dataState.filterValue}
        handleFilterStatus={handleFilterProductStatus}
      />
      <div className='flex justify-between xl:justify-start xl:gap-5'>
        <Form
          render={() => {
            return (
              <FormElement>
                <div className='flex justify-between'>
                  <div className='w-80 xl:w-56'>
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
        <div className='flex gap-3 items-center'>
          <ButtonCreate
            themeColor={'primary'}
            path={EnumPath.CREATE_YOUR_PRODUCT}
            icon='plus'
            text='product.addNewProduct'
          />
        </div>
      </div>
    </div>
  );
}

export { FormToolbarListProduct };
