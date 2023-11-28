import React, { type CSSProperties } from 'react';

interface ICardForm {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const CardForm: React.FC<ICardForm> = ({ children, className, style }) => {
  return (
    <div
      style={style}
      className={`bg-white p-5 shadow-2-12 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default CardForm;
