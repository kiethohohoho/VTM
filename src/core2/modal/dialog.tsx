import { Dialog, DialogActionsBar, type DialogProps } from '@progress/kendo-react-dialogs';
import React from 'react';

import { type IConfirmButton } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';

import { ButtonRoot } from '../button';

export interface IModelDefault extends DialogProps {
  show?: boolean;
  widthBody?: number;
  onConfirm?: () => void;
  onShowModal: () => void;
  confirmButton?: Omit<IConfirmButton, 'label'>;
  labelConfirm?: string;
  contentDialog?: string | React.ReactNode;
}

const ModalRoot: React.FC<IModelDefault> = ({
  className,
  onConfirm = () => {},
  widthBody = 600,
  confirmButton,
  labelConfirm = 'Save',
  show,
  onShowModal,
  contentDialog = 'If you have a bad day, let shopping. It will make u to feel happier but u poor, Are u agree?',
  title,
  ...rest
}) => {
  /* hook */
  return show ? (
    <Dialog
      className={className}
      onClose={onShowModal}
      title={<Localize tid={title} />}
      {...rest}>
      <div
        style={{
          maxWidth: widthBody,
          minWidth: widthBody,
        }}>
        {contentDialog}
      </div>
      <DialogActionsBar layout='end'>
        <ButtonRoot
          themeColor={'base'}
          onClick={onShowModal}>
          <Localize tid={'dialog.close'} />
        </ButtonRoot>
        <ButtonRoot
          themeColor={'success'}
          onClick={() => {
            onConfirm();
            onShowModal();
          }}>
          <Localize tid={labelConfirm} />
        </ButtonRoot>
      </DialogActionsBar>
    </Dialog>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default ModalRoot;
