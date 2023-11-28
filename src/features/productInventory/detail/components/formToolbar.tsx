import { Form, FormElement } from '@progress/kendo-react-form';
import { useNavigate } from 'react-router-dom';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { EnumPath, From, Limit, Order, OrderBy } from '@/utils/Enums';
interface IParametersHandleSubmit {
  search: IItemDataDropDown;
  searchValue: string;
}

function FormToolbarStore({ dataState, onDataStateChange }: IToolBarProps) {
  const navigate = useNavigate();

  /* variable */
  const itemsDropdownStore: IItemDataDropDown[] = [
    {
      id: 'store.name',
      text: LocalizeTypeFunc('store.storeName'),
    },
    {
      id: 'store.shopName',
      text: LocalizeTypeFunc('store.shopName'),
    },
  ];

  /* handle */
  const handleSubmitFormStore = ({ search, searchValue }: IParametersHandleSubmit) => {
    const newDataState: IState = {
      ...dataState,
      search: search.id,
      searchValue,
    };
    onDataStateChange(newDataState);
  };
  const handleResetStore = () => {
    const resetDataState: IState = {
      order: Order.CREATED_AT,
      by: OrderBy.DESC,
      skip: From.DEFAULT,
      take: Limit.DEFAULT,
    };
    onDataStateChange(resetDataState);
  };

  return (
    <Form
      onSubmitClick={(data: any) => {
        handleSubmitFormStore(data.values);
      }}
      render={() => (
        <FormElement>
          <div className='ls-flex ls-justify_between ls-mb_larger'>
            <div className='ls-flex ls-gap_2'>
              <div className='ls-w_48'>
                <DropDownRoot
                  isForm
                  defaultItem={{ text: <Localize tid='searchBy' /> }}
                  id='search'
                  data={itemsDropdownStore}
                  name={''}
                />
              </div>
              <div className='ls-flex'>
                <InputRoot
                  id='searchValue'
                  name='searchValue'
                  placeholder={'enterValue'}
                />
              </div>
              <ButtonRoot
                icon='zoom'
                type='submit'>
                <span className='ls-px_sm'>
                  <Localize tid='search' />
                </span>
              </ButtonRoot>
              <ButtonRoot
                onClick={handleResetStore}
                icon='reset'
                type='submit'>
                <span className='ls-px_sm'>
                  <Localize tid='reset' />
                </span>
              </ButtonRoot>
            </div>
            <ButtonRoot
              onClick={() => {
                navigate(EnumPath.STORE_CREATE);
              }}
              icon='plus'
              type='submit'>
              <span className='ls-px_sm'>
                <Localize tid='create' />
              </span>
            </ButtonRoot>
          </div>
        </FormElement>
      )}
    />
  );
}

export default FormToolbarStore;
