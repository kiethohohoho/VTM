import { type UploadProps } from 'antd';

export interface uploadProps extends UploadProps {
  className?: string;
  size?: '' | 'large' | 'small';
}
