import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm, CardPage } from '@/core2/card';
import { EnumPath } from '@/utils/Enums';

import { type IImage } from '../types';
import { FormProductInformation } from './Components/FormProductInformation';
import { FormProductSkus } from './Components/FormProductSkus';

interface IViewProduct {
  images: IImage[];
  isLoading: boolean;
  handleUploadImage: (image: any) => void;
  handleRemoveImage: (id: string) => void;
  handleUploadProduct: (dataItem: Record<string, any>) => void;
}
const ViewCreateProduct = (props: IViewProduct) => {
  const { images, isLoading, handleUploadImage, handleRemoveImage, handleUploadProduct } = props;
  return (
    <>
      <Form
        onSubmit={value => {
          handleUploadProduct(value);
        }}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <CardPage
              backPath={EnumPath.PRODUCT}
              className='px-10'
              title='product.addNewProduct'>
              <FormElement>
                <section className='text-end mb-4'>
                  <ButtonRoot
                    themeColor={'primary'}
                    loadingThemeColor={'light'}
                    disabled={!formRenderProps.valid && images.length < 1}
                    className='w-40'
                    type='submit'
                    loading={isLoading}>
                    <Localize tid='save'></Localize>
                  </ButtonRoot>
                </section>
                <div className='flex gap-8 xl:flex-column'>
                  <section className='flex-1 h-max'>
                    <FormProductInformation
                      images={images}
                      handleRemoveImage={handleRemoveImage}
                      handleUploadImage={handleUploadImage}
                    />
                  </section>
                  <CardForm className='border border-solid border-neutral-40 p-6 mt-5'>
                    <div className='w-64 h-max xl:w-full'>
                      <FormProductSkus />
                    </div>
                  </CardForm>
                </div>
              </FormElement>
            </CardPage>
          );
        }}
      />
    </>
  );
};

export { ViewCreateProduct };
