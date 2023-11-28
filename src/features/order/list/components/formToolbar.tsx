import { Form, FormElement } from '@progress/kendo-react-form';
import { useNavigate } from 'react-router-dom';

import { Localize } from '@/context/languages';
import { ButtonDropDown, ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { EnumPath, From, Limit, Order, OrderBy } from '@/utils/Enums';
interface IParametersHandleSubmit {
  search: IItemDataDropDown;
  searchValue: string;
}

function FormToolbarOrder({ dataState, onDataStateChange }: IToolBarProps) {
  const navigate = useNavigate();

  /* variable */
  const itemsDropdownOrder: IItemDataDropDown[] = [
    {
      id: 'order.orderId',
      text: 'order.orderId',
    },
    {
      id: 'order.lsAccountId',
      text: 'order.lsAccountId',
    },
  ];

  /* handle */
  const handleSubmitFormOrder = ({ search, searchValue }: IParametersHandleSubmit) => {
    const newDataState: IState = {
      ...dataState,
      search: search?.id,
      searchValue,
    };
    onDataStateChange(newDataState);
  };
  const handleResetOrder = () => {
    const resetDataState: IState = {
      order: Order.CREATED_AT,
      by: OrderBy.DESC,
      skip: From.DEFAULT,
      take: Limit.DEFAULT,
    };
    onDataStateChange(resetDataState);
  };
  const handleNavigate = ({ label, value }: any) => {
    navigate(value);
  };
  return (
    <Form
      onSubmitClick={(data: any) => {
        handleSubmitFormOrder(data.values);
      }}
      render={() => {
        return (
          <FormElement>
            <div className='ls-flex ls-justify_between ls-mb_larger'>
              <div className='ls-flex ls-gap_2'>
                <div className='ls-w_48'>
                  <DropDownRoot
                    isForm
                    id='search'
                    data={itemsDropdownOrder}
                    name={'search'}
                  />
                </div>
                <div className='ls-flex'>
                  <InputRoot
                    id='searchValue'
                    name='searchValue'
                    placeholder={'Enter Value'}
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
                  onClick={handleResetOrder}
                  icon='reset'
                  type='submit'>
                  <span className='ls-px_sm'>
                    <Localize tid='reset' />
                  </span>
                </ButtonRoot>
              </div>
              <ButtonDropDown
                text={<Localize tid={'create'} />}
                onItemClick={handleNavigate}
                icon='plus'
                items={[{ label: 'order.createLocalStore', value: EnumPath.ORDER_CREATE }]}
              />
            </div>
          </FormElement>
        );
      }}
    />
  );
}

export default FormToolbarOrder;
