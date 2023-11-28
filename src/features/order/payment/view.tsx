import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { InputRoot, RadioGroupRoot } from '@/core2/input';
import { ItemRoot } from '@/core2/item';
import { PAYMENT_METHOD, PAYMENT_METHOD_PARSE, PAYMENT_STATUS_PARSE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
  handleDone: () => void;
  detail: any;
  orderRes: any;
}

const ViewOrderPayment: FunctionComponent<ViewProps> = ({ handleSubmit, loading, handleDone, detail, orderRes }) => {
  return (
    <CardPage>
      {!detail ? (
        <section className='ls-pt_medium ls-profile-grid_col1-3'>
          <article className='ls-py_medium ls-bd_b ls-mb_medium'>
            <h2>
              <Localize tid='order.titlePayment' />
            </h2>
          </article>
          <Form
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => {
              return (
                <FormElement>
                  <div className='ls-w-full ls-pt_larger ls-flex ls-flex-col ls-gap_2'>
                    <ItemRoot
                      label={'orderO2O.totalAmount'}
                      content={orderRes.orderGroup?.totalPrice}
                    />
                    <RadioGroupRoot
                      label={'order.paymentMethod'}
                      layout='horizontal'
                      isForm
                      data={[
                        {
                          value: PAYMENT_METHOD.CASH,
                          label: `order.pay.${PAYMENT_METHOD_PARSE[PAYMENT_METHOD.CASH]}`,
                        },
                        {
                          value: PAYMENT_METHOD.E_WALLET,
                          label: `order.pay.${PAYMENT_METHOD_PARSE[PAYMENT_METHOD.E_WALLET]}`,
                        },
                        {
                          value: PAYMENT_METHOD.VISA,
                          label: `order.pay.${PAYMENT_METHOD_PARSE[PAYMENT_METHOD.VISA]}`,
                        },
                        {
                          value: PAYMENT_METHOD.BANK_TRANSFER,
                          label: `order.pay.${PAYMENT_METHOD_PARSE[PAYMENT_METHOD.BANK_TRANSFER]}`,
                        },
                      ]}
                      name='paymentMethod'
                      id='paymentMethod'
                    />
                    <div className='ls-w_50percent'>
                      <InputRoot
                        label={'order.amountReceived'}
                        id='amountReceived'
                        name='amountReceived'
                      />
                    </div>
                  </div>
                  <div className='ls-flex ls-justify_end'>
                    <ButtonRoot
                      type='submit'
                      disabled={!formRenderProps.valid}
                      className='ls-w_36'
                      loading={loading}>
                      <Localize tid={'profile.submit'} />
                    </ButtonRoot>
                  </div>
                </FormElement>
              );
            }}
          />
        </section>
      ) : (
        <section className='ls-flex ls-flex-col ls-gap_3'>
          <section className='ls-px_larger'>
            <article className='ls-py_larger ls-flex ls-flex-col ls-gap_2'>
              <ItemRoot
                label={'order.paymentId'}
                content={detail.paymentId}
              />
              <ItemRoot
                label={'order.orderId'}
                content={detail.orderId}
              />
              <ItemRoot
                label={'order.paymentMethod'}
                content={<Localize tid={`order.pay.${PAYMENT_METHOD_PARSE[detail.paymentMethod]}`} />}
              />
              <ItemRoot
                label={'order.paymentStatus'}
                content={<Localize tid={`payment.status.${PAYMENT_STATUS_PARSE[detail.paymentStatus]}`} />}
              />
              <ItemRoot
                label={'order.amountReceived'}
                content={Helper.formatCurrency(detail.amountReceived)}
              />
              <ItemRoot
                label={'order.amountPay'}
                content={Helper.formatCurrency(detail.amountPay)}
              />
              <ItemRoot
                label={'order.refundAmount'}
                content={Helper.formatCurrency(detail.refundAmount)}
              />
              <ItemRoot
                label={'order.transactionDate'}
                content={Helper.formatDateFull(detail.transactionDate)}
              />
            </article>
            <div className='ls-flex ls-justify_end'>
              <ButtonRoot
                type='button'
                className='ls-w_36'
                loading={loading}
                onClick={handleDone}>
                <Localize tid={'button.done'} />
              </ButtonRoot>
            </div>
          </section>
        </section>
      )}
    </CardPage>
  );
};

export default ViewOrderPayment;
