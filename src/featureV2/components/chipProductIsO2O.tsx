import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_PUBLISH_O2O } from '@/utils/Enums';
interface IPropsChipStatusProduct {
  status: STATUS_PUBLISH_O2O;
  children: React.ReactNode | string;
}

function ChipProductIsO2O({ status, children }: IPropsChipStatusProduct) {
  const variable: IColorChip = {
    [STATUS_PUBLISH_O2O.ISO2O]: 'success',
    [STATUS_PUBLISH_O2O.LOCAL]: 'info',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipProductIsO2O };
