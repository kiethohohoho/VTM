import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import Config from '@/Config';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
// import { getListStore } from '@/features/common/getListStore';
import { Helper } from '@/utils/Helper';

import { type IImportProductModel, type IStandardImportProductModel } from './types';
interface IViewImportGoodsByBarcode {
  warehouses: IItemDataDropDown[];
  isLoading: boolean;
  isLoadingGetListWareHouse: boolean;
  listProduct: IImportProductModel[];
  isLoadingSearchBarcode: boolean;
  handleSubmit: (dataItem: Record<string, string>) => void;
  handleChooseStore: (storeId: string) => void;
  handleSearchBarcode: (dataItem: Record<string, string>) => void;
  convertProductDataFromServer: (product: IImportProductModel) => IStandardImportProductModel;
}

const config = new Config().getState();

const ViewDialogImportGoodsByBarcode: FunctionComponent<IViewImportGoodsByBarcode> = ({
  handleSearchBarcode,
  handleSubmit,
  convertProductDataFromServer,
  isLoadingSearchBarcode,
  listProduct,
  warehouses,
  isLoadingGetListWareHouse,
  isLoading,
}) => {
  return (
    <section className='ls-profile-grid_col1-3'>
      {!(listProduct.length > 0) ? (
        <Form
          onSubmit={handleSearchBarcode}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className={`flex flex-column gap-3`}>
                  <div className='w-full'>
                    <InputRoot
                      label={'barcode'}
                      id='barcode'
                      name='barcode'
                      required
                    />
                  </div>
                  <ButtonRoot
                    type='submit'
                    themeColor={'primary'}
                    disabled={isLoadingSearchBarcode || !formRenderProps.valid}
                    className='ls-w_36 ls-h_13 ls-ml_auto ls-mt_larger'>
                    <Localize tid={'submit'} />
                  </ButtonRoot>
                </div>
              </FormElement>
            );
          }}
        />
      ) : (
        <div className='w-full'>
          <Form
            initialValues={{
              warehouse: warehouses[0],
            }}
            onSubmit={values => {
              handleSubmit(values);
            }}
            render={(formRenderProps: FormRenderProps) => {
              return (
                <FormElement>
                  <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {listProduct.map((productData, index) => {
                      const product = convertProductDataFromServer(productData);
                      const imagesGoodFirst = JSON.parse(product.images)[0];
                      const key = `${product.productId}-${product.sku}`;
                      return (
                        <div
                          className={`flex gap-3 mb-6 ${
                            index === listProduct.length - 1 ? '' : 'border-b border-dashed border-neutral-50'
                          } pb-6`}
                          key={key}>
                          <div className='flex'>
                            <img
                              src={`${config.api.static.host}${imagesGoodFirst}`}
                              width={80}
                              height={80}
                              alt='goods image'
                            />
                          </div>
                          <InputRoot
                            name={`${key}.sku`}
                            label='sku'
                            id={`${key}.sku`}
                            tabIndex={-1}
                            defaultValue={product.sku}
                            style={{
                              pointerEvents: 'none',
                            }}
                          />
                          <InputRoot
                            name={`${key}.name`}
                            label='name'
                            id={`${key}.name`}
                            isForm={false}
                            value={product.name}
                            tabIndex={-1}
                            style={{
                              pointerEvents: 'none',
                            }}
                          />
                          <InputRoot
                            name={`${key}.quantity`}
                            label='quantity'
                            id={`${key}.quantity`}
                            required
                          />
                          <InputRoot
                            name={`${key}.importPrice`}
                            label='importPrice'
                            id={`${key}.importPrice`}
                            required
                          />
                          <InputRoot
                            name={`${key}.sellingPrice`}
                            label={'sellingPrice'}
                            id={`${key}.sellingPrice`}
                            defaultValue={
                              Helper.isEmpty(product.goodsModel) ? '' : String(product.goodsModel?.price || '')
                            }
                            disabled={!Helper.isEmpty(product.goodsModel)}
                            required={Helper.isEmpty(product.goodsModel)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex justify-end'>
                    <ButtonRoot
                      type='submit'
                      disabled={isLoading}
                      themeColor={'primary'}
                      loading={isLoading}>
                      <Localize tid={'save'} />
                    </ButtonRoot>
                  </div>
                </FormElement>
              );
            }}
          />
        </div>
      )}
    </section>
  );
};

export { ViewDialogImportGoodsByBarcode };
