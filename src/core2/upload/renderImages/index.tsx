import './_index.scss';

import imageDefault from '@/assets/images/default/core/default.jpg';
import { Helper } from '@/utils/Helper';

interface IRenderImages {
  images: string[];
  onShowModal: () => void;
  type?: string;
}

function RenderImages({ images, onShowModal, type }: IRenderImages) {
  const length = images.length;

  if (Helper.equalNumberAndConditionNumber(length, 3)) {
    return (
      <div className='flex renderImages_gap'>
        <img
          onClick={() => {
            onShowModal();
          }}
          className='renderImages_img_2 object-cover'
          src={images[0] || imageDefault}
        />
        <div className='flex column renderImages_gap'>
          <img
            onClick={() => {
              onShowModal();
            }}
            className='renderImages_img_3 object-cover'
            src={images[1] || imageDefault}
          />
          <div className='relative'>
            <img
              onClick={() => {
                onShowModal();
              }}
              className='renderImages_img_3 object-cover'
              src={images[2] || imageDefault}
            />
            <div className='renderImages_absolute'>
              <span className='text-md'>+</span>
              {length - 3}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    switch (length) {
      case 2:
        return (
          <div className='flex'>
            {images.map((item, index) => (
              <img
                onClick={() => {
                  onShowModal();
                }}
                key={item}
                className='renderImages_img_2 object-cover'
                src={item}
              />
            ))}
          </div>
        );
      case 3:
        return (
          <div className='flex renderImages_gap'>
            <img
              onClick={() => {
                onShowModal();
              }}
              className='renderImages_img_2 object-cover'
              src={images[0] || imageDefault}
            />
            <div className='flex flex-column renderImages_gap'>
              <img
                onClick={() => {
                  onShowModal();
                }}
                className='renderImages_img_3 object-cover'
                src={images[1] || imageDefault}
              />
              <img
                onClick={() => {
                  onShowModal();
                }}
                className='renderImages_img_3 object-cover'
                src={images[2] || imageDefault}
              />
            </div>
          </div>
        );
      default:
        return (
          <img
            onClick={() => {
              onShowModal();
            }}
            style={{
              width: type === 'CCCD' ? 220 : 'inherit',
              height: type === 'CCCD' ? 120 : 'inherit',
            }}
            className='renderImages_img object-cover'
            src={images[0] || imageDefault}
          />
        );
    }
  }
}

export default RenderImages;
