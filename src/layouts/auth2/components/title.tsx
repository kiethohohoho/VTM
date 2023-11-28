import React from 'react';

import { Localize } from '@/context/languages';

interface ILayoutAuthTitle {
  title: string;
  description?: string;
}

const LayoutAuthTitle: React.FC<ILayoutAuthTitle> = ({ title, description, children }) => {
  return (
    <div className='px-20'>
      <h1
        style={{
          fontWeight: 500,
        }}
        className='text-primary text-5xl'>
        <Localize tid={title} />
      </h1>
      <p className='text-neutral-80 text-neutral-70'>
        <Localize tid={description || ''} />
      </p>
    </div>
  );
};

export default LayoutAuthTitle;
