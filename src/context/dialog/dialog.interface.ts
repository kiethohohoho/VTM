import type React from 'react';

import { type IButtonRoot } from '@/core2/button/types';
export enum TYPE_MODAL {
  CONFIRM = 0,
  IMAGE,
  CUSTOM,
}

export enum TYPE_DIALOG {
  CONFIRM = 0,
  IMAGE,
  EXPIRED_TOKEN,
  UPDATE_GROUP_STAFF,
  UPDATE_CONSUMER,
  UPDATE_WAREHOUSE,
  UPDATE_STATUS_DEVICE,
  UPDATE_CATEGORY,
  IMPORT_GOODS_BAR_CODE,
  ORDER_ADD_CONSUMER,
  UPDATE_STATUS_ORDER,
  IMPORT_GOODS,
  UPDATE_STATUS_ORDER_O2O,
  UPDATE_STAFF,
  SELECT_PAYMENT_ORDER,
}

export interface IConfirmButton extends IButtonRoot {
  label: string;
}

export enum STATUS_MODAL {
  SUCCESS = 0,
  FAIL,
}

export interface IDialog {
  typeDialog: TYPE_DIALOG;
  typeModel: TYPE_MODAL;
  data?: any;
  titleDialog?: string | React.ReactElement;
  confirmButton?: IConfirmButton;
  contentDialog?: React.ReactNode | string;
  onSubmit?: () => void;
  setStatus?: (status: STATUS_MODAL) => void;
  status?: STATUS_MODAL;
}

export interface IContextModal {
  onShowModal: () => void;
  onSetView: (parameter: IDialog) => void;
  show: boolean;
  typeModel: TYPE_MODAL;
  titleDialog?: string | React.ReactElement;
  contentDialog?: React.ReactNode | string;
  confirmButton?: IConfirmButton;
  typeDialog: TYPE_DIALOG;
  data?: any;
  onSubmit?: () => void;
  setStatus: (status: STATUS_MODAL) => void;
  status?: STATUS_MODAL;
}
