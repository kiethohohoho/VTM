import { useContext, useEffect } from 'react';

import { ContextModal } from '@/context/dialog';
import { TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { ModalCustom, ModalImage, ModalRoot } from '@/core2/modal';

import { viewDialog } from './config';

function DialogRoot() {
  /* hook */
  const { typeDialog, typeModel, show, confirmButton, onShowModal, titleDialog, contentDialog, onSubmit } =
    useContext(ContextModal);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  /* render */
  switch (typeModel) {
    case TYPE_MODAL.IMAGE:
      return (
        <ModalImage
          onShowModal={onShowModal}
          show={show}>
          {viewDialog[typeDialog].component}
        </ModalImage>
      );
    case TYPE_MODAL.CUSTOM:
      return <ModalCustom>{viewDialog[typeDialog].component}</ModalCustom>;
    default:
      return (
        <ModalRoot
          onConfirm={onSubmit}
          show={show}
          contentDialog={contentDialog}
          onShowModal={onShowModal}
          title={titleDialog}
          labelConfirm={confirmButton?.label}
          confirmButton={confirmButton}>
          {viewDialog[typeDialog].component}
        </ModalRoot>
      );
  }
}

export default DialogRoot;
