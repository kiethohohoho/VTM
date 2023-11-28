import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_ACCOUNT } from '@/utils/Enums';

interface IPropsChipStatus {
  status: STATUS_ACCOUNT;
  children: React.ReactNode | string;
}

function ChipStatusStaff({ status, children }: IPropsChipStatus) {
  const variable: IColorChip = {
    [STATUS_ACCOUNT.ACTIVE]: 'success',
    [STATUS_ACCOUNT.LOCKED]: 'danger',
  };
  const color = variable[status];
  return <ChipRoot roundColor={color}>{children}</ChipRoot>;
}

export default ChipStatusStaff;
