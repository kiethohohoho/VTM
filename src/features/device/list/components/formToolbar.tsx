import { Form, FormElement } from '@progress/kendo-react-form';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';
interface IParametersHandleSubmit {
  fil: IItemDataDropDown;
  filterValue: string;
}

function FormToolbarDevice({ dataState, onDataStateChange }: IToolBarProps) {
  /* variable */
  const itemsDropdownConsumer: IItemDataDropDown[] = [
    {
      id: 'devices.deviceDisplayName',
      text: 'device.deviceDisplayName',
    },
    {
      id: 'devices.deviceId',
      text: 'device.deviceId',
    },
  ];

  /* handle */
  const handleSubmitFormDevice = ({ fil, filterValue }: IParametersHandleSubmit) => {
    const newDataState: IState = {
      ...dataState,
      fil: fil.id as string,
      filterValue,
    };
    onDataStateChange(newDataState);
  };
  const handleResetDevice = () => {
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
        handleSubmitFormDevice(data.values);
      }}
      render={() => {
        return (
          <FormElement>
            <div className='ls-flex ls-justify_between ls-mb_larger'>
              <div className='ls-flex ls-gap_2'>
                <div className='ls-w_48'>
                  <DropDownRoot
                    isForm
                    id='fil'
                    data={itemsDropdownConsumer}
                    name={'fil'}
                  />
                </div>
                <div className='ls-flex'>
                  <InputRoot
                    id='filterValue'
                    name='filterValue'
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
                  onClick={handleResetDevice}
                  icon='reset'
                  type='submit'>
                  <span className='ls-px_sm'>
                    <Localize tid='reset' />
                  </span>
                </ButtonRoot>
              </div>
            </div>
          </FormElement>
        );
      }}
    />
  );
}

export default FormToolbarDevice;
