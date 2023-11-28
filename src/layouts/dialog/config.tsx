import React from 'react';

import { TYPE_DIALOG } from '@/context/dialog/dialog.interface';

import DialogExpiredTokenIndex from './expiredToken';
import DialogImagesCoreIndex from './image';
import DialogImportGoods from './importGoods';
import DialogImportGoodsBarCode from './importGoodsBarCode';
import DialogOrderAddConsumerComponent from './orderAddConsumer';
import DialogSelectPaymentOrder from './selectPaymentOrder';
import DialogUpdateCategory from './updateCategory';
import DialogUpdateConsumer from './updateConsumer';
import DialogUpdateGroupStaff from './updateGroupStaff';
import DialogUpdateStaffIndex from './updateStaff';
import DialogUpdateStatusDevice from './updateStatusDevice';
import DialogUpdateStatusOrder from './updateStatusOrder';
import DialogUpdateStatusOrderO2O from './updateStatusOrderO2O';
import DialogUpdateWarehouse from './updateWarehouse';
interface IViewDialog {
  enums: number;
  component: React.ReactNode;
}

export const viewDialog: IViewDialog[] = [
  {
    enums: TYPE_DIALOG.CONFIRM,
    component: <React.Fragment />,
  },

  {
    enums: TYPE_DIALOG.IMAGE,
    component: <DialogImagesCoreIndex />,
  },
  {
    enums: TYPE_DIALOG.EXPIRED_TOKEN,
    component: <DialogExpiredTokenIndex />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_GROUP_STAFF,
    component: <DialogUpdateGroupStaff />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_CONSUMER,
    component: <DialogUpdateConsumer />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_WAREHOUSE,
    component: <DialogUpdateWarehouse />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_STATUS_DEVICE,
    component: <DialogUpdateStatusDevice />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_CATEGORY,
    component: <DialogUpdateCategory />,
  },
  {
    enums: TYPE_DIALOG.IMPORT_GOODS_BAR_CODE,
    component: <DialogImportGoodsBarCode />,
  },
  {
    enums: TYPE_DIALOG.ORDER_ADD_CONSUMER,
    component: <DialogOrderAddConsumerComponent />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_STATUS_ORDER,
    component: <DialogUpdateStatusOrder />,
  },
  {
    enums: TYPE_DIALOG.IMPORT_GOODS,
    component: <DialogImportGoods />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_STATUS_ORDER_O2O,
    component: <DialogUpdateStatusOrderO2O />,
  },
  {
    enums: TYPE_DIALOG.UPDATE_STAFF,
    component: <DialogUpdateStaffIndex />,
  },
  {
    enums: TYPE_DIALOG.SELECT_PAYMENT_ORDER,
    component: <DialogSelectPaymentOrder />,
  },
];
