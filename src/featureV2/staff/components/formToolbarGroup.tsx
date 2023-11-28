import { Form, FormElement } from '@progress/kendo-react-form';
import { useEffect, useState } from 'react';

import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { useDebounce } from '@/hooks/useDebounce';
import { useFirstRender } from '@/hooks/useFirstRender';
import { Helper } from '@/utils/Helper';

function FormToolbarListGroup({ dataState, onDataStateChange }: IToolBarProps) {
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
        newDataState.search = 'group.name';
        newDataState.searchValue = debounceSearchValue;
      }
      onDataStateChange(Helper.removeObjectEmpty(newDataState));
    }
  }, [debounceSearchValue]);
  return (
    <div className='pb-3'>
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

export { FormToolbarListGroup };
