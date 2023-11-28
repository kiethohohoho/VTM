import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_GOODS, type STATUS_STORE } from '@/utils/Enums';
interface IPropsChipStatusProduct {
  status: STATUS_STORE;
  children: React.ReactNode | string;
}

function ChipProductStatus({ status, children }: IPropsChipStatusProduct) {
  const variable: IColorChip = {
    [STATUS_GOODS.APPROVED]: 'success',
    [STATUS_GOODS.WAITING]: 'warning',
    [STATUS_GOODS.CANCELED]: 'danger',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipProductStatus };
