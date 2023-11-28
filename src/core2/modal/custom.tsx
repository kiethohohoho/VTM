import { Dialog, type DialogProps } from '@progress/kendo-react-dialogs';
import React, { useContext } from 'react';

import { ContextModal } from '@/context/dialog';

export interface IModelDefault extends DialogProps {
  widthBody?: number;
  onConfirm?: () => void;
  actionCustom?: React.ReactNode;
  labelConfirm?: string;
}

const ModalCustom: React.FC<IModelDefault> = ({
  children,
  className,
  onConfirm,
  widthBody = 600,
  labelConfirm = 'Save Change',
  actionCustom,
  ...rest
}) => {
  /* hook */
  const { show, onShowModal, titleDialog } = useContext(ContextModal);
  return show ? (
    <Dialog
      title={titleDialog}
      className={className}
      onClose={onShowModal}
      {...rest}>
      {children}
    </Dialog>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default ModalCustom;
