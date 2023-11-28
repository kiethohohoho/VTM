import { Form, FormElement } from '@progress/kendo-react-form';
import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
interface IFormToolbarCategoryProps extends IToolBarProps {
  listStore: IItemDataDropDown[];
}
type PayloadFilterConsumer = IState & { storeId: string };
function FormToolbarConsumer(props: IFormToolbarCategoryProps) {
  const { dataState, onDataStateChange, listStore } = props;
  // const navigate = useNavigate();
  const [storeId, setStoreId] = useState<IItemDataDropDown>(listStore[0]);
  const [randomKey, setRandomKey] = useState<string>('randomKey');

  /* variable */
  const itemsDropdownConsumer: IItemDataDropDown[] = [
    {
      id: 'consumer.name',
      text: 'consumer.name',
    },
    {
      id: 'consumer.consumerId',
      text: 'consumer.consumerId',
    },
  ];

  /* handle */
  const handleSubmitFormConsumer = (data: any) => {
    const newDataState: PayloadFilterConsumer = {
      ...dataState,
      fil: data.fil?.id as string,
      filterValue: data.filterValue,
      storeId: data.store?.id || storeId.id,
    };
    onDataStateChange(newDataState);
  };
  const handleResetConsumer = () => {
    const resetDataState: PayloadFilterConsumer = {
      ...{
        order: Order.CREATED_AT,
        by: OrderBy.DESC,
        skip: From.DEFAULT,
        take: Limit.DEFAULT,
      },
      storeId: listStore[0].id as string,
    };
    setRandomKey(Helper.randomKey());
    setStoreId(listStore[0]);
    onDataStateChange(resetDataState);
  };

  return (
    <Form
      key={randomKey}
      onSubmitClick={(data: any) => {
        handleSubmitFormConsumer(data.values);
      }}
      render={() => {
        return (
          <FormElement>
            <div className='ls-flex ls-justify_between ls-mb_larger'>
              <div className='ls-flex ls-gap_2'>
                {/* <div className='ls-w_48'>
                  <DropDownRoot
                    id='store'
                    name='store'
                    isForm
                    data={listStore}
                    // disabled={loadingStore}
                    defaultValue={storeId}
                  />
                </div> */}
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
                  onClick={handleResetConsumer}
                  icon='reset'
                  type='submit'>
                  <span className='ls-px_sm'>
                    <Localize tid='reset' />
                  </span>
                </ButtonRoot>
              </div>
              {/* <ButtonRoot
                onClick={() => {
                  navigate(EnumPath.CONSUMER_CREATE);
                }}
                rounded='md'
                icon='plus'
                type='submit'
                bgColor='info'
                size='md'>
                <span className='ls-px_sm'>
                  <Localize tid='create' />
                </span>
              </ButtonRoot> */}
            </div>
          </FormElement>
        );
      }}
    />
  );
}

export default FormToolbarConsumer;
