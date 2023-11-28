/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React, { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { PaymentMethod, PaymentMethodPrase } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';
interface IResponseDetail {
  userId: string;
  name: string;
  phone: string;
}
interface ViewProps {
  handleSubmit: (dataItem: Record<string, string>) => void;
  loading: boolean;
  detail: IResponseDetail;
}

const listPayment: IItemDataDropDown[] = [
  // {
  //   id: PaymentMethod.bankTransfer,
  //   text: PaymentMethodPrase[PaymentMethod.bankTransfer],
  // },

  {
    id: PaymentMethod.cash,
    text: PaymentMethodPrase[PaymentMethod.cash],
  },
  // {
  //   id: PaymentMethod.e_wallet,
  //   text: PaymentMethodPrase[PaymentMethod.e_wallet],
  // },
  // {
  //   id: PaymentMethod.visa,
  //   text: PaymentMethodPrase[PaymentMethod.visa],
  // },
];
const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading, detail }) => {
  return (
    <Form
      validator={(values: any) =>
        ValidatorComponent({
          values,
          validators: {
            paymentMethod: [VALIDATOR.EMPTY],
          },
        })
      }
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => {
        return (
          <React.Fragment>
            <section className='w-96 flex flex-column gap-5'>
              <DropDownRoot
                label='Select payment method'
                isForm
                name='paymentMethod'
                data={listPayment}
              />
              <FormElement>
                <ButtonRoot
                  disabled={!formRenderProps.valid}
                  themeColor='primary'
                  type='submit'
                  loading={loading}>
                  <Localize tid={'confirm'} />
                </ButtonRoot>
              </FormElement>
            </section>
          </React.Fragment>
        );
      }}
    />
  );
};

export default View;
