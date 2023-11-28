/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
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

// const listStatus: IDataRadioRoot[] = [
//   {
//     value: StatusStaff.active,
//     label: StatusStaffParse[StatusStaff.active],
//   },
//   {
//     value: StatusStaff.block,
//     label: StatusStaffParse[StatusStaff.block],
//   },
// ];
const View: FunctionComponent<ViewProps> = ({ handleSubmit, loading, detail }) => {
  return (
    <section className='w-full'>
      <Form
        initialValues={{
          name: detail.name,
          // status: detail.status,
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='flex flex-column gap-3 w-full'>
                <InputRoot
                  label={'fullName'}
                  id='name'
                  name='name'
                />
                {/* <div>
                  <p className='k-label text-lg text-neutral-100 p-0'>
                    <Localize tid='status' />
                  </p>
                  <RadioGroupRoot
                    isForm
                    name={'status'}
                    id={'status'}
                    data={listStatus}
                  />
                </div> */}

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
