/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
// import { DropDownRoot } from '@/core2/dropdown';
// import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
// import { LoaderRoot } from '@/core2/loader';
import { type IResponseDetail } from '@/features/warehouse/detail/component';

interface ViewProps {
  handleSubmit: (dataItem: Record<string, string>) => void;
  loading: boolean;
  detail: IResponseDetail;
  // loadingStore: boolean;
  // listStore: IItemDataDropDown[] | [];
}

const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading, detail }) => {
  // const defaultStore = listStore.find(item => item.id === detail.storeId);
  return (
    <section className='ls-p_medium ls-w_96'>
      {/* {!loadingStore && listStore ? ( */}
      <Form
        initialValues={{
          // storeId: defaultStore || listStore[0],
          name: detail.name,
          address: detail.address,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='ls-pt_larger ls-flex ls-flex-col ls-gap_3 ls-w_full ls-z_50'>
                {/* <DropDownRoot
                    defaultValue={defaultStore}
                    label={'store.storeName'}
                    id='storeId'
                    name='storeId'
                    isForm
                    data={listStore}
                  /> */}
                <InputRoot
                  label={'warehouse.name'}
                  id='name'
                  name='name'
                />
                <InputRoot
                  label={'warehouse.address'}
                  id='address'
                  name='address'
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
      {/* ) : (
        <LoaderRoot />
      )} */}
    </section>
  );
};

export default View;
