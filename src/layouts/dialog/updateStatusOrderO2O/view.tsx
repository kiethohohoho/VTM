import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { RadioGroupRoot } from '@/core2/input';
import { STATUS_ORDER, STATUS_ORDER_PARSE } from '@/utils/Enums';

import { type IViewUpdateStatusOrders } from '.';

function ViewUpdateStatusOrder({ detail, handleSubmit, loading, onShowModal }: IViewUpdateStatusOrders) {
  const listStatus: any[] = Object.keys(STATUS_ORDER)
    .filter(key => !Number.isNaN(Number(key)))
    .map(val => ({
      value: val,
      label: `order.status.${STATUS_ORDER_PARSE[Number(val)]}`,
    }));
  return (
    <section className='ls-p_medium'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          status: detail.order.orderStatus.toString(),
        }}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <React.Fragment>
              <section
                style={{ width: 600 }}
                className='ls-p_medium'>
                <FormElement>
                  <RadioGroupRoot
                    label='status'
                    layout='horizontal'
                    isForm
                    data={listStatus}
                    name='status'
                    id='status'
                  />
                  <div className='ls-flex ls-justify_end ls-mt_medium'>
                    <ButtonRoot
                      type='submit'
                      disabled={!formRenderProps.valid}
                      className='ls-w_36'
                      loading={loading}>
                      <Localize tid={'profile.submit'} />
                    </ButtonRoot>
                  </div>
                </FormElement>
              </section>
            </React.Fragment>
          );
        }}
      />
    </section>
  );
}

export default ViewUpdateStatusOrder;
