import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';

import CardForm from '@/core2/card/form';
import CardPage from '@/core2/card/page';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { LoaderRoot } from '@/core2/loader';
import ButtonSubmitForm from '@/featureV2/components/buttonSubmitForm';
import { EnumPath } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';
interface ViewProps {
  handleSubmit: (dataItem: Record<any, any>) => void;
  loading: boolean;
  loadingStore: boolean;
  listStore: IItemDataDropDown[] | [];
}
const ViewCreateConsumer = (props: ViewProps) => {
  const { handleSubmit, loading, loadingStore, listStore } = props;
  return (
    <>
      {!loadingStore && listStore ? (
        <CardPage
          backPath={EnumPath.CONSUMER}
          className='px-10'
          title='consumer.createTitle'>
          <CardForm>
            <Form
              validator={(values: any) =>
                ValidatorComponent({
                  values,
                  validators: {
                    name: [VALIDATOR.EMPTY],
                    phone: [VALIDATOR.EMPTY],
                  },
                })
              }
              initialValues={
                {
                  // storeId: listStore[0],
                }
              }
              onSubmit={handleSubmit}
              render={(formRenderProps: FormRenderProps) => {
                return (
                  <div className='flex flex-column gap-5'>
                    <div className='grid grid-cols-2 gap-5'>
                      <InputRoot
                        label={'consumer.name'}
                        id='name'
                        name='name'
                      />
                      <InputRoot
                        id='phone'
                        name='phone'
                        label={'consumer.phone'}
                      />
                    </div>
                    <FormElement className='text-end'>
                      <ButtonSubmitForm
                        disabled={!formRenderProps.valid}
                        className='w-40'
                        loading={loading}
                      />
                    </FormElement>
                  </div>
                );
              }}
            />
          </CardForm>
        </CardPage>
      ) : (
        <LoaderRoot />
      )}
    </>
  );
};

export default ViewCreateConsumer;
