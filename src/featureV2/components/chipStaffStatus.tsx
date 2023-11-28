import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { StatusStaff } from '@/utils/Enums';
interface IPropsStatusStaff {
  status: StatusStaff;
  children: React.ReactNode | string;
}

function ChipStaffStatus({ status, children }: IPropsStatusStaff) {
  const variable: IColorChip = {
    [StatusStaff.block]: 'danger',
    [StatusStaff.active]: 'success',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipStaffStatus };
