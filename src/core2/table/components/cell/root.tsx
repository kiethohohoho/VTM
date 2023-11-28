import React from 'react';
interface ICellRoot {
  children: React.ReactNode | string;
  align?: 'center' | 'start' | 'end';
}

function CellRoot({ children, align = 'start' }: ICellRoot) {
  return (
    <td
      style={{
        textAlign: align,
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: align,
        }}>
        {children}
      </div>
    </td>
  );
}

export default CellRoot;
