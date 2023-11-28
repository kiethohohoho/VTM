import { type DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { Form, FormElement, type FormSubmitClickEvent } from '@progress/kendo-react-form';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import DateRangePickerCore from '@/core2/dateRangePicker';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { STATUS_ORDER, STATUS_ORDER_PARSE } from '@/utils/Enums';

import { type ListOrderO2OState } from './component';
import OrderList from './components/viewList';
interface IOrderListView {
  state: ListOrderO2OState;
  isLoading: boolean;
  listStore: IItemDataDropDown[];
  handleSubmitSearch: (data: Record<string, any>) => void;
  handleResetOrder: () => void;
  handleChangeDate: (val: DateRangePickerChangeEvent) => void;
  handleUpdateSuccess: () => void;
}
function OrderListView(props: IOrderListView) {
  const { state, isLoading, handleSubmitSearch, handleResetOrder, handleChangeDate, handleUpdateSuccess } = props;
  const listStatus: any = [];
  Object.keys(STATUS_ORDER)
    .filter(key => !Number.isNaN(Number(key)))
    .forEach(val => {
      listStatus.push({
        id: val,
        text: `order.status.${STATUS_ORDER_PARSE[Number(val)]}`,
      });
    });
  return (
    <section>
      <Form
        onSubmitClick={(data: FormSubmitClickEvent) => {
          handleSubmitSearch(data.values);
        }}
        render={() => {
          return (
            <FormElement>
              <div className='ls-mb_sm ls-bg_white ls-p_medium ls-rounded_md'>
                <div className='ls-flex ls-gap_2'>
                  <div className='ls-w_48'>
                    <DropDownRoot
                      isForm
                      label='Status'
                      id='filterValue'
                      data={listStatus}
                      name={'filterValue'}
                    />
                  </div>
                  {/* <div className='ls-w_48'>
                    <DropDownRoot
                      isForm
                      label='Store'
                      id='store'
                      data={listStore}
                      name={'store'}
                    />
                  </div> */}
                  <div className='ls-w_80 ls-ml_sm'>
                    <DateRangePickerCore onChange={handleChangeDate} />
                  </div>
                  <div className='ls-flex ls-flex-col ls-justify_end'>
                    <ButtonRoot
                      icon='zoom'
                      type='submit'>
                      <span className='ls-px_sm'>
                        <Localize tid='search' />
                      </span>
                    </ButtonRoot>
                  </div>
                  <div className='ls-flex ls-flex-col ls-justify_end'>
                    <ButtonRoot
                      onClick={handleResetOrder}
                      icon='reset'
                      type='button'>
                      <span className='ls-px_sm'>
                        <Localize tid='reset' />
                      </span>
                    </ButtonRoot>
                  </div>
                </div>
              </div>
            </FormElement>
          );
        }}
      />
      <div>
        <OrderList
          orderList={state.orderList}
          isLoading={isLoading}
          handleUpdateSuccess={handleUpdateSuccess}
          storeId={state.payload.storeId}
        />
      </div>
    </section>
  );
}

export default OrderListView;
