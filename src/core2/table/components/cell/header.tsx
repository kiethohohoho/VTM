import React from 'react';
interface ICellHeader {
  children: React.ReactNode | string;
  align?: 'center' | 'end' | 'start';
  className?: string;
}

function CellHeader({ children, align = 'start', className }: ICellHeader) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: align,
      }}>
      {children}
    </div>
  );
}

export default CellHeader;
