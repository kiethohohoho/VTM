import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';

import { type IViewUpdateOrders } from '.';

function ViewUpdateOrder({ handleSubmit, loading, onShowModal }: IViewUpdateOrders) {
  return (
    <section className='ls-p_medium ls-w_96'>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='pt-6 flex flex-column gap-3 w-full'>
                <InputRoot
                  label={'consumer.phone'}
                  id='phone'
                  name='phone'
                />
                <InputRoot
                  label={'consumer.name'}
                  id='name'
                  name='name'
                />
                <div className='flex justify-end'>
                  <ButtonRoot
                    type='submit'
                    disabled={!formRenderProps.valid}
                    themeColor={'primary'}
                    loading={loading}>
                    <Localize tid={'profile.submit'} />
                  </ButtonRoot>
                </div>
              </div>
            </FormElement>
          );
        }}
      />
    </section>
  );
}

export default ViewUpdateOrder;
