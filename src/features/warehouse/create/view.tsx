import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { LoaderRoot } from '@/core2/loader';

interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
  loadingStore: boolean;
  listStore: IItemDataDropDown[] | [];
}

const ViewCreateWarehouse: FunctionComponent<ViewProps> = ({ handleSubmit, loading, loadingStore, listStore }) => {
  return (
    <CardPage>
      {!loadingStore && listStore ? (
        <section className='ls-pt_medium ls-profile-grid_col1-3'>
          <article className='ls-py_medium ls-bd_b ls-mb_medium'>
            <h2>
              <Localize tid='warehouse.createTitle' />
            </h2>
          </article>
          <Form
            initialValues={{
              storeId: listStore[0],
            }}
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => {
              return (
                <FormElement>
                  <div className='ls-w-full ls-pt_larger ls-flex ls-gap_2'>
                    {/* <div className='ls-w_50percent'>
                      <DropDownRoot
                        defaultValue={listStore[0]}
                        label={'store.storeName'}
                        id='storeId'
                        name='storeId'
                        isForm
                        data={listStore}
                        onGetValue={(id: string, value: string) => {}}
                      />
                    </div> */}
                    <div className='ls-w_50percent'>
                      <InputRoot
                        label={'warehouse.name'}
                        id='name'
                        name='name'
                      />
                    </div>
                    <div className='ls-w_50percent'>
                      <InputRoot
                        id='address'
                        name='address'
                        label={'warehouse.address'}
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
      ) : (
        <LoaderRoot />
      )}
    </CardPage>
  );
};

export default ViewCreateWarehouse;
