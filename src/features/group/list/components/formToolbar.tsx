import { Form, FormElement } from '@progress/kendo-react-form';
import { useNavigate } from 'react-router-dom';

import { Localize } from '@/context/languages';
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

function FormToolbarGroup({ dataState, onDataStateChange }: IToolBarProps) {
  const navigate = useNavigate();

  /* variable */
  const itemsDropdownGroup: IItemDataDropDown[] = [
    {
      id: 'group.name',
      text: 'groupStaff.groupStaffName',
    },
    {
      id: 'group.groupStaffId',
      text: 'groupStaff.groupStaffId',
    },
  ];

  /* handle */
  const handleSubmitFormGroup = ({ search, searchValue }: IParametersHandleSubmit) => {
    const newDataState: IState = {
      ...dataState,
      search: search.id,
      searchValue,
    };
    onDataStateChange(newDataState);
  };
  const handleResetGroup = () => {
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
        handleSubmitFormGroup(data.values);
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
                    data={itemsDropdownGroup}
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
                  onClick={handleResetGroup}
                  icon='reset'
                  type='submit'>
                  <span className='ls-px_sm'>
                    <Localize tid='reset' />
                  </span>
                </ButtonRoot>
              </div>
              <ButtonRoot
                onClick={() => {
                  navigate(EnumPath.GROUP_STAFF_CREATE);
                }}
                icon='plus'
                type='submit'>
                <span className='ls-px_sm'>
                  <Localize tid='create' />
                </span>
              </ButtonRoot>
            </div>
          </FormElement>
        );
      }}
    />
  );
}

export default FormToolbarGroup;
