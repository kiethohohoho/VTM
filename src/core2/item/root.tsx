import React from 'react';

import { Localize } from '@/context/languages';

interface IItemRoot {
  label: string;
  content: string | React.ReactElement;
}

const ItemRoot: React.FC<IItemRoot> = ({ children, content, label }) => {
  return (
    <div className='flex'>
      <div
        style={{
          width: 250,
        }}
        className='text-neutral-600'>
        <Localize tid={label} />
      </div>
      :<div className='px-2'>{content}</div>
    </div>
  );
};

export default ItemRoot;
