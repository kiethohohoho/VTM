import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { useContext } from 'react';

import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { Helper } from '@/utils/Helper';

export interface IViewDialogImportGoods {
  loading: boolean;
  warehouses: IItemDataDropDown[];
  isLoadingGetListWareHouse: boolean;
  handleSubmit: (parameters: Record<string, any>) => void;
  onShowModal: () => void;
}

function ViewDialogImportGoods({
  handleSubmit,
  loading,
  onShowModal,
  warehouses,
  isLoadingGetListWareHouse,
}: IViewDialogImportGoods) {
  const { data } = useContext(ContextModal);
  return (
    <section className='p-6 w-96'>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='flex flex-column gap-3 w-full'>
                <DropDownRoot
                  label='warehouse.title'
                  id='warehouse'
                  name='warehouse'
                  isForm
                  defaultItem={warehouses[0]}
                  data={warehouses}
                  disabled={isLoadingGetListWareHouse}
                />
                <InputRoot
                  label={'quantity'}
                  id='quantity'
                  name='quantity'
                  required
                />
                <InputRoot
                  label={'importPrice'}
                  id='importPrice'
                  name='importPrice'
                  required
                />
                {Helper.isEmpty(data.goods.goodsModel) && (
                  <InputRoot
                    label={'sellingPrice'}
                    id='sellingPrice'
                    name='sellingPrice'
                    required
                  />
                )}
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

export { ViewDialogImportGoods };
