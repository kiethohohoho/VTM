import React from 'react';

interface IWrapperMain {
  children: React.ReactNode;
}

const WrapperMain: React.FC<IWrapperMain> = ({ children }) => {
  return <div className='p-6'>{children}</div>;
};

export default WrapperMain;
