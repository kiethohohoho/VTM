import { type ModalProps } from 'antd';
export interface ModalCommonProps extends ModalProps {
  handleOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}
