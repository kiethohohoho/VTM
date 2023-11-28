import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_ORDER } from '@/utils/Enums';

interface IPropsChipStatus {
  status: STATUS_ORDER;
  children: React.ReactNode | string;
}

function ChipStatusOrder({ status, children }: IPropsChipStatus) {
  const variable: IColorChip = {
    [STATUS_ORDER.CANCELED]: 'danger',
    [STATUS_ORDER.RETURN_REFUND]: 'warning',
    [STATUS_ORDER.SHIPPING]: 'info',
    [STATUS_ORDER.COMPLETED]: 'success',
    [STATUS_ORDER.CONFIRMED]: 'success',
  };
  const color = variable[status];
  return <ChipRoot roundColor={color}>{children}</ChipRoot>;
}

export { ChipStatusOrder };
