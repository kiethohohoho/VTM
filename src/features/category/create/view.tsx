import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';

interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
  listStore: IItemDataDropDown[];
}

const ViewCreateCategory: FunctionComponent<ViewProps> = ({ handleSubmit, loading, listStore }) => {
  return (
    <CardPage>
      <section className='ls-pt_medium ls-profile-grid_col1-3'>
        <article className='ls-py_medium ls-bd_b ls-mb_medium'>
          <h2>
            <Localize tid='category.createTitle' />
          </h2>
        </article>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='ls-w-full ls-pt_larger ls-flex ls-gap_2'>
                  {/* <div className='ls-w_50percent'>
                    <DropDownRoot
                      label={'store.storeName'}
                      id='store'
                      name='store'
                      isForm
                      data={listStore}
                      // disabled={loadingStore}
                      defaultValue={listStore[0]}
                    />
                  </div> */}
                  <div className='ls-w_50percent'>
                    <InputRoot
                      label={'category.name'}
                      id='name'
                      name='name'
                    />
                  </div>
                </div>
                <div className='ls-flex ls-justify_end ls-mt_sm'>
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

export default ViewCreateCategory;
