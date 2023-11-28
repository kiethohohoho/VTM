import { Modal } from 'antd';
import classNames from 'classnames';

import { type ModalCommonProps } from './type';

const ModalAntd: React.FC<ModalCommonProps> = ({
  title,
  open,
  closable,
  okText,
  cancelText,
  handleOk,
  handleCancel,
  children,
  footer,
  width,
  className = '',
  centered = true,
  isLoading,
  mask,
  getContainer,
  style,
  wrapClassName = '',
}) => {
  return (
    <Modal
      centered={centered}
      className={classNames('modal-common', className, {
        'hide-close': !handleCancel,
      })}
      wrapClassName={wrapClassName}
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
      closable={closable}
      confirmLoading={isLoading}
      mask={mask}
      getContainer={getContainer}
      // closeIcon={handleCancel}
      style={style}
      footer={
        // footer ||
        footer === null ? null : footer
      }>
      {children}
    </Modal>
  );
};

export default ModalAntd;
