import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_ORDER } from '@/utils/Enums';

interface IPropsChipStatus {
  status: STATUS_ORDER;
  children: React.ReactNode | string;
}

function ChipStatus({ status, children }: IPropsChipStatus) {
  const variable: IColorChip = {
    [STATUS_ORDER.CANCELED]: 'danger',
    [STATUS_ORDER.PENDING_PAYMENT]: 'warning',
    [STATUS_ORDER.PREPARING]: 'warning',
  };
  const color = variable[status];
  return <ChipRoot roundColor={color}>{children}</ChipRoot>;
}

export default ChipStatus;
