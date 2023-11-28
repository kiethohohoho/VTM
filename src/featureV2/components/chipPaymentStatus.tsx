import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { PaymentStatus } from '@/utils/Enums';
interface IPropsChipPaymentStatus {
  status: PaymentStatus;
  children: React.ReactNode | string;
}

function ChipPaymentStatus({ status, children }: IPropsChipPaymentStatus) {
  const variable: IColorChip = {
    [PaymentStatus.failed]: 'danger',
    [PaymentStatus.paid]: 'success',
    [PaymentStatus.unpaid]: 'loading',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipPaymentStatus };
