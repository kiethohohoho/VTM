import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { InputRoot } from '@/core2/input';

interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
}

const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading }) => {
  return (
    <CardPage>
      <section className='ls-pt_medium ls-profile-grid_col1-3'>
        <article className='ls-py_medium ls-bd_b ls-mb_medium'>
          <h2>
            <Localize tid='groupStaff.inviteStaff' />
          </h2>
        </article>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='ls-w_40percent ls-pt_larger ls-flex ls-flex-col ls-gap_3'>
                  {/* <div className='ls-w_40percent'> */}
                  <InputRoot
                    label={'fullName'}
                    id='name'
                    name='name'
                  />
                  <InputRoot
                    label={'phoneNumber'}
                    id='phone'
                    name='phone'
                  />
                  {/* </div> */}
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
    </CardPage>
  );
};

export default View;
