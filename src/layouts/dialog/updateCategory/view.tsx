/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import { type IResponseDetail } from '@/features/consumer/detail/component';

interface ViewProps {
  handleSubmit: (dataItem: Record<string, string>) => void;
  loading: boolean;
  detail: IResponseDetail;
}

const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading, detail }) => {
  return (
    <section className='ls-p_medium ls-w_96'>
      <Form
        initialValues={{
          name: detail.name,
          phone: detail.phone,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='ls-pt_larger ls-flex ls-flex-col ls-gap_3 ls-w_full'>
                <InputRoot
                  label={'category.name'}
                  id='name'
                  name='name'
                />
                <div className='ls-flex ls-justify_end'>
                  <ButtonRoot
                    type='submit'
                    disabled={!formRenderProps.valid}
                    className='ls-w_36'
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
};

export default View;
