import React from 'react';

import { Localize } from '@/context/languages';

interface IItemVertical {
  label?: string;
  children?: React.ReactNode;
  content: string;
}

const ItemVertical: React.FC<IItemVertical> = ({ children, content = 'shatinon@jeemail.com', label = 'Address' }) => {
  return (
    <div className='flex flex-column'>
      <span className='font-medium text-neutral-90 text-lg'>{children || <Localize tid={label} />}</span>
      <span className='font-light text-neutral-70'>{content}</span>
    </div>
  );
};

export default ItemVertical;
