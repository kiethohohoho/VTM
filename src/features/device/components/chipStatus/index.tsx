import './_index.scss';

import React from 'react';

import { STATUS_DEVICE } from '@/utils/Enums';

type IStatusChipGroup = Record<STATUS_DEVICE, string>;

interface IPropsChipStatusGroup {
  status: STATUS_DEVICE;
  children: React.ReactNode | string;
}

function ChipStatusDevice({ status, children }: IPropsChipStatusGroup) {
  const variable: IStatusChipGroup = {
    [STATUS_DEVICE.TRUST]: 'success',
    [STATUS_DEVICE.UN_KNOW]: 'warning',
    [STATUS_DEVICE.UN_TRUST]: 'error',
  };
  return <div className={`ls-chipStatus_${variable[status]}`}>{children}</div>;
}

export default ChipStatusDevice;
