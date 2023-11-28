import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { PaymentMethod } from '@/utils/Enums';
interface IPropsChipPaymentMethod {
  status: PaymentMethod;
  children: React.ReactNode | string;
}

function ChipPaymentMethod({ status, children }: IPropsChipPaymentMethod) {
  const variable: IColorChip = {
    [PaymentMethod.bankTransfer]: 'default',
    [PaymentMethod.cash]: 'loading',
    [PaymentMethod.e_wallet]: 'success',
    [PaymentMethod.visa]: 'primary',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipPaymentMethod };
