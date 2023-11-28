import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';
import React from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputPassword, RadioGroupRoot } from '@/core2/input';
import { PARSE_STATUS_DEVICE, STATUS_DEVICE } from '@/utils/Enums';

import { type IViewUpdateStatusDevice } from '.';

function ViewUpdateStatusDevice({ detail, handleSubmit, loading, onShowModal }: IViewUpdateStatusDevice) {
  return (
    <section className='p_medium'>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          status: detail.status,
        }}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <React.Fragment>
              <FormElement>
                <section
                  style={{ width: 400 }}
                  className='p-4 flex flex-column gap-4'>
                  <Label className='text-lg text-neutral-100 mb-1'>
                    <Localize tid={'device.status'} />
                  </Label>
                  <RadioGroupRoot
                    layout='horizontal'
                    isForm
                    data={[
                      {
                        value: STATUS_DEVICE.TRUST,
                        label: `device.${PARSE_STATUS_DEVICE[STATUS_DEVICE.TRUST]}`,
                      },
                      {
                        value: STATUS_DEVICE.UN_TRUST,
                        label: `device.${PARSE_STATUS_DEVICE[STATUS_DEVICE.UN_TRUST]}`,
                      },
                      {
                        value: STATUS_DEVICE.UN_KNOW,
                        label: `device.${PARSE_STATUS_DEVICE[STATUS_DEVICE.UN_KNOW]}`,
                      },
                    ]}
                    name='status'
                    id='status'
                  />

                  <InputPassword
                    label='account.passwordLabel'
                    name={'password'}
                    id={'password'}
                  />
                  <div className='flex justify_end mt_medium'>
                    <ButtonRoot
                      type='submit'
                      disabled={!formRenderProps.valid}
                      className='w_36'
                      loading={loading}>
                      <Localize tid={'profile.submit'} />
                    </ButtonRoot>
                  </div>
                </section>
              </FormElement>
            </React.Fragment>
          );
        }}
      />
    </section>
  );
}

export default ViewUpdateStatusDevice;
