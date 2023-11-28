/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';

interface IResponseDetail {
  groupStaffId: string;
  storeId: string;
  name: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
}
interface ViewProps {
  handleSubmit: (dataItem: Record<string, string>) => void;
  loading: boolean;
  detail: IResponseDetail;
}

const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading, detail }) => {
  return (
    <section className='w-full'>
      <Form
        initialValues={{
          name: detail.name,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='flex flex-column gap-3 w-full'>
                <InputRoot
                  label={'groupStaff.groupStaffName'}
                  id='name'
                  name='name'
                />

                <ButtonRoot
                  themeColor='primary'
                  type='submit'
                  disabled={!formRenderProps.allowSubmit}
                  className='ls-w_36'
                  loading={loading}>
                  <Localize tid={'confirm'} />
                </ButtonRoot>
              </div>
            </FormElement>
          );
        }}
      />
    </section>
  );
};

export default View;
