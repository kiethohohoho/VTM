import { Dialog, type DialogProps } from '@progress/kendo-react-dialogs';
import React from 'react';

export interface IModelDefault extends DialogProps {
  widthBody?: number;
  onConfirm?: () => void;
  actionCustom?: React.ReactNode;
  labelConfirm?: string;
  show: boolean;
  onShowModal: () => void;
}

const ModalImage: React.FC<IModelDefault> = ({
  children,
  className,
  onConfirm,
  widthBody = 1024,
  labelConfirm = 'Save Change',
  actionCustom,
  show,
  onShowModal,
  ...rest
}) => {
  /* hook */

  return show ? (
    <Dialog
      className={className}
      onClose={onShowModal}
      {...rest}>
      <div
        style={{
          maxWidth: widthBody,
          overflow: 'hidden',
          maxHeight: '100vh',
        }}>
        {children}
      </div>
    </Dialog>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default ModalImage;
