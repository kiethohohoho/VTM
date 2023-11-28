import { useState } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import { Helper } from '@/utils/Helper';

interface IFormProductSkus {}

const FormProductSkus = (props: IFormProductSkus) => {
  const [listFieldSkuId, setListFieldSkuId] = useState<string[]>([Helper.randomKey()]);

  const removeFieldSkuId = (id: string) => {
    const removedList = listFieldSkuId.filter(fieldSkuId => fieldSkuId !== id);
    setListFieldSkuId(removedList);
  };
  const addFieldSkuId = () => {
    setListFieldSkuId(prev => [...prev, Helper.randomKey()]);
  };
  return (
    <div>
      <h4>Product Skus</h4>
      {listFieldSkuId.map((skuFieldId, index) => {
        return (
          <div
            key={skuFieldId}
            className={`flex gap-3 flex-column ${
              index === listFieldSkuId.length - 1 ? '' : 'border-b border-dashed border-neutral-50'
            }  mb-6 pb-6`}>
            <div className='flex gap-3 items-center'>
              <h4 className='m-0'>Sku</h4>
              {listFieldSkuId.length !== 1 && (
                <span
                  className='text-xs text-primary cursor-pointer'
                  onClick={() => {
                    removeFieldSkuId(skuFieldId);
                  }}>
                  Remove
                </span>
              )}
            </div>
            <div className='flex gap-2 items-center'>
              <InputRoot
                name={`productSkus.${skuFieldId}.skuVariationIncluded`}
                label='sku.variation'
                className='flex-1'
                required
              />
              <InputRoot
                name={`productSkus.${skuFieldId}.barcode`}
                label='barcode'
                className='flex-1'
                required
              />
            </div>
            <div className='flex gap-2 items-center'>
              <InputRoot
                name={`productSkus.${skuFieldId}.quantity`}
                label='quantity'
                className='flex-1'
                required
              />
              <InputRoot
                name={`productSkus.${skuFieldId}.importPrice`}
                label='importPrice'
                className='flex-1'
                required
              />
              <InputRoot
                name={`productSkus.${skuFieldId}.sellingPrice`}
                label='sellingPrice'
                className='flex-1'
                required
              />
            </div>
            <InputRoot
              name={`productSkus.${skuFieldId}.description`}
              label='description'
              required
            />
          </div>
        );
      })}
      <ButtonRoot
        themeColor={'base'}
        className='w-full'
        type='button'
        onClick={() => {
          addFieldSkuId();
        }}>
        <Localize tid='sku.addMore' />
      </ButtonRoot>
    </div>
  );
};

export { FormProductSkus };
