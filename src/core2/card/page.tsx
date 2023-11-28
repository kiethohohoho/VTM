import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Localize } from '@/context/languages';

import { ButtonRoot } from '../button';

interface ICardPage {
  title?: string;
  className?: string;
  backPath?: string;
}

const CardPage: React.FC<ICardPage> = ({ children, backPath, title, className }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-column'>
      {(title || backPath) && (
        <div className='text-4xl px-10 py-8 font-bold flex justify-between'>
          {title && (
            <div className='text-ellipsis break-words overflow-hidden xl:w-80'>
              <Localize tid={title} />
            </div>
          )}
          {backPath && (
            <div className='flex items-center'>
              <ButtonRoot
                onClick={() => {
                  navigate(backPath);
                }}
                size={'medium'}
                themeColor={'secondary'}
                text='back'>
                <div className='flex items-center'>
                  <span className='k-icon k-i-arrow-chevron-left pr-4' />
                  <Localize tid={'backButton'} />
                </div>
              </ButtonRoot>
            </div>
          )}
        </div>
      )}

      <div className={className}>{children}</div>
    </div>
  );
};

export default CardPage;
