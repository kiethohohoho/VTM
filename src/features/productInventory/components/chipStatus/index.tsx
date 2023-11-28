import './_index.scss';

import React from 'react';

import { STATUS_STORE } from '@/utils/Enums';

type IStatusChipStore = Record<STATUS_STORE, string>;

interface IPropsChipStatusStore {
  status: STATUS_STORE;
  children: React.ReactNode | string;
}

function ChipStatusStore({ status, children }: IPropsChipStatusStore) {
  const variable: IStatusChipStore = {
    [STATUS_STORE.ACTIVE]: 'success',
    [STATUS_STORE.WAITING]: 'success',
    [STATUS_STORE.LOCKED]: 'error',
    [STATUS_STORE.NOT_ACTIVATED]: 'error',
  };
  return <div className={`ls-chipStatus_${variable[status]}`}>{children}</div>;
}

export default ChipStatusStore;
