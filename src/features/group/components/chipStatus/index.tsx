import './_index.scss';

import React from 'react';

import { STATUS_STORE } from '@/utils/Enums';

type IStatusChipGroup = Record<STATUS_STORE, string>;

interface IPropsChipStatusGroup {
  status: STATUS_STORE;
  children: React.ReactNode | string;
}

function ChipStatusGroup({ status, children }: IPropsChipStatusGroup) {
  const variable: IStatusChipGroup = {
    [STATUS_STORE.ACTIVE]: 'success',
    [STATUS_STORE.WAITING]: 'success',
    [STATUS_STORE.LOCKED]: 'error',
    [STATUS_STORE.NOT_ACTIVATED]: 'error',
  };
  return <div className={`ls-chipStatus_${variable[status]}`}>{children}</div>;
}

export default ChipStatusGroup;
