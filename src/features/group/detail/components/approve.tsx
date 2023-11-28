import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_APPROVE } from '@/utils/Enums';

interface IPropsChipStatus {
  status: STATUS_APPROVE;
  children: React.ReactNode | string;
}

function ChipStatusApprove({ status, children }: IPropsChipStatus) {
  const variable: IColorChip = {
    [STATUS_APPROVE.APPROVED]: 'success',
    [STATUS_APPROVE.REJECTED]: 'danger',
    [STATUS_APPROVE.PENDING]: 'default',
  };
  const color = variable[status];
  return <ChipRoot roundColor={color}>{children}</ChipRoot>;
}

export default ChipStatusApprove;
