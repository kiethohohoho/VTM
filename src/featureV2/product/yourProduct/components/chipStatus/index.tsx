import React from 'react';

import ChipRoot, { type IColorChip } from '@/core2/button/chip';
import { STATUS_PRODUCT_RETAILER, type STATUS_STORE } from '@/utils/Enums';
interface IPropsChipStatusProduct {
  status: STATUS_STORE;
  children: React.ReactNode | string;
}

function ChipStatusProduct({ status, children }: IPropsChipStatusProduct) {
  const variable: IColorChip = {
    [STATUS_PRODUCT_RETAILER.APPROVED]: 'success',
    [STATUS_PRODUCT_RETAILER.PENDING_APPROVAL]: 'warning',
    [STATUS_PRODUCT_RETAILER.REJECTED]: 'danger',
  };
  return <ChipRoot roundColor={variable[status]}>{children}</ChipRoot>;
}

export { ChipStatusProduct };
