import './_index.scss';

import React, { useContext, useEffect, useState } from 'react';

import { ContextModal } from '@/context/dialog';

function DialogImagesCoreView() {
  /* hook */
  const { onShowModal, data } = useContext(ContextModal);
  const [indexSrcCurrent, setIndexSrcCurrent] = useState<number>(0);
  const [images, setImages] = useState<string[]>(['']);
  useEffect(() => {
    if (data) {
      setImages(data);
    }
  }, []);
  /* variable */
  const lengthImage = images.length - 1;

  /* handle */
  const handleNext = () => {
    const next = indexSrcCurrent + 1;
    handleCheckIndexCurrentOfNext(next);
  };
  const handlePrev = () => {
    const prev = indexSrcCurrent - 1;
    handleCheckIndexCurrentOfPrev(prev);
  };

  const handleCheckIndexCurrentOfNext = (index: number) => {
    if (index > lengthImage) {
      setIndexSrcCurrent(0);
    } else {
      setIndexSrcCurrent(index);
    }
  };

  const handleCheckIndexCurrentOfPrev = (index: number) => {
    if (index < 0) {
      setIndexSrcCurrent(lengthImage);
    } else {
      setIndexSrcCurrent(index);
    }
  };
  const handleSetIndexCurrentWhenClickPicture = (index: number) => {
    setIndexSrcCurrent(index);
  };

  return (
    <div className='ls-dImage_width ls-dImage_height ls-dImage_pl'>
      <div
        className='ls-w_full ls-relative ls-dImage_Dheight'
        style={{
          backgroundImage: `url(${images[indexSrcCurrent]})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}>
        {data.length !== 1 && (
          <React.Fragment>
            <span
              onClick={() => {
                handlePrev();
              }}
              className='k-icon k-i-arrow-chevron-left ls-dImage_icon ls-dImage_iconL ls-text_3xl'></span>
            <span
              onClick={() => {
                handleNext();
              }}
              className='k-icon k-i-arrow-chevron-right ls-dImage_icon ls-dImage_iconR ls-text_3xl'></span>
          </React.Fragment>
        )}
      </div>
      <div className='ls-dImage_list'>
        <span
          className='k-icon k-i-close-outline ls-dImage_close ls-text_xl'
          onClick={() => {
            onShowModal();
          }}></span>
        <div>background-size</div>
        <div className='ls-dImage_lists'>
          {images.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleSetIndexCurrentWhenClickPicture(index);
                }}
                className={`ls-dImage_list-item ${index === indexSrcCurrent && 'ls-dImage_list-item-active'}`}
                key={item}
                style={{
                  backgroundImage: `url(${item})`,
                }}></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DialogImagesCoreView;
