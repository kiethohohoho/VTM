import React, { createContext, useMemo, useState } from 'react';

import { type IContextModal, type IDialog, STATUS_MODAL, TYPE_DIALOG, TYPE_MODAL } from './dialog.interface';

const initialContextModal: IContextModal = {
  onShowModal: () => {},
  show: false,
  typeDialog: TYPE_DIALOG.CONFIRM,
  onSetView: ({ typeDialog, typeModel }) => {},
  typeModel: TYPE_MODAL.CONFIRM,
  setStatus: () => {},
};

export const ContextModal = createContext(initialContextModal);

export interface IPropsProviderModal {
  children: React.ReactNode;
}

const initialState: IDialog = {
  typeDialog: TYPE_DIALOG.CONFIRM,
  typeModel: TYPE_MODAL.CONFIRM,
  status: STATUS_MODAL.FAIL,
};

export const ProviderModal = ({ children }: IPropsProviderModal) => {
  const [show, setShow] = useState<boolean>(false);
  const [stateContextModal, setStateContextModal] = useState<IDialog>(initialState);

  const value = useMemo(
    () => ({
      onShowModal: () => {
        setShow(!show);
      },
      show,
      setStatus: (status: STATUS_MODAL) => {
        setStateContextModal({
          ...stateContextModal,
          status,
        });
      },
      onSetView: ({ typeDialog, typeModel, confirmButton, data, titleDialog, contentDialog, onSubmit }: IDialog) => {
        setStateContextModal({
          typeDialog,
          typeModel,
          titleDialog,
          data,
          confirmButton,
          contentDialog,
          onSubmit,
          status: STATUS_MODAL.FAIL,
        });
        setShow(!show);
      },
      ...stateContextModal,
    }),
    [show, stateContextModal],
  );

  return <ContextModal.Provider value={value}>{children}</ContextModal.Provider>;
};
