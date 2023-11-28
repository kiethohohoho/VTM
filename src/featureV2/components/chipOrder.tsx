import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { StatusOrder } from '@/utils/Enums';
interface IPropsChipStatusOrder {
  status: StatusOrder;
  children: React.ReactNode | string;
}

function ChipStatusOrder({ status, children }: IPropsChipStatusOrder) {
  const variable: IColorChip = {
    [StatusOrder.completed]: 'success',
    [StatusOrder.confirmed]: 'info',
    [StatusOrder.delivered]: 'default',
    [StatusOrder.packed]: 'primary',
    [StatusOrder.pendingPayment]: 'success',
    [StatusOrder.preparing]: 'primary',
    [StatusOrder.readyToShip]: 'warning',
    [StatusOrder.returnRefund]: 'default',
    [StatusOrder.shipping]: 'primary',
    [StatusOrder.toSellerResponse]: 'success',
    [StatusOrder.toShip]: 'danger',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipStatusOrder };
