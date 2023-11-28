import { type ChipProps } from '@progress/kendo-react-buttons';
import React from 'react';

import { type ColorBasic } from '../common/type';
export type IColorChip = Record<number, ColorBasic>;
export interface IChipRoot extends ChipProps {
  color?: ColorBasic;
  roundColor?: ColorBasic;
  simple?: boolean;
}

const ChipRoot: React.FC<IChipRoot> = ({ roundColor, children }) => {
  return (
    <div
      className={`bg-${roundColor}-bg-color font-medium w-fit py-1 px-3 text-${roundColor}-bold text-md rounded-md border border-solid border-${roundColor}-bold`}>
      {children}
    </div>
  );
};

export default ChipRoot;
