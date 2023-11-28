import { InputRoot } from '@/core2/input';
import { UploadRoot } from '@/core2/upload';
import { Helper } from '@/utils/Helper';

import { type IImage } from '../../types';
interface IFormProductInformation {
  images: IImage[];
  handleUploadImage: (image: any) => void;
  handleRemoveImage: (id: string) => void;
}

const FormProductInformation = (props: IFormProductInformation) => {
  const { images, handleRemoveImage, handleUploadImage } = props;
  return (
    <div className='flex flex-column gap-5'>
      <InputRoot
        label={'name'}
        id='name'
        name='name'
        required
      />
      <InputRoot
        label={'category'}
        id='category'
        name='category'
        required
      />
      <InputRoot
        id='description'
        name='description'
        label={'description'}
        required
      />
      <div className='flex gap-3 items-center'>
        {images.map(image => {
          return (
            <div
              key={Helper.randomKey()}
              className='border-box p-3  border border-solid border-neutral-40 rounded-lg relative w-max h-max'>
              <img
                width={36}
                height={36}
                src={image.src}
                alt=''
                style={{
                  objectFit: 'cover',
                }}
              />
              <div
                className='absolute top-0 right-0 w-3 h-3 flex items-center justify-center'
                onClick={() => {
                  handleRemoveImage(image.id);
                }}>
                <span className='k-icon k-font-icon k-i-close k-icon-xs'></span>
              </div>
            </div>
          );
        })}
      </div>
      <UploadRoot
        name='images'
        isForm={false}
        onChange={value => {
          if (!Helper.isEmpty(value.value)) {
            const files = value.value.files;
            handleUploadImage(files);
          }
        }}
        multi
        controlled
      />
    </div>
  );
};

export { FormProductInformation };
