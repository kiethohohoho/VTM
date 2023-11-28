import './_index.scss';

import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_DEVICE } from '@/utils/Enums';
interface IPropsChipStatusGroup {
  status: STATUS_DEVICE;
  children: React.ReactNode | string;
}

function ChipStatusDevice({ status, children }: IPropsChipStatusGroup) {
  const variable: IColorChip = {
    [STATUS_DEVICE.TRUST]: 'success',
    [STATUS_DEVICE.UN_KNOW]: 'warning',
    [STATUS_DEVICE.UN_TRUST]: 'danger',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export default ChipStatusDevice;
