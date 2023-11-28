import { CloudUploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import classNames from 'classnames';

import { type uploadProps } from './type';
export const UploadCommon = ({
  children,
  onPreview,
  customRequest,
  name = 'image',
  listType = 'picture-card',
  beforeUpload,
  onChange,
  showUploadList,
  fileList,
  maxCount = 1,
  className,
  size, // '' | 'large'
}: uploadProps) => {
  const defaultCustomRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <div className={classNames('upload-common', size)}>
      <Upload
        onPreview={onPreview}
        customRequest={customRequest || defaultCustomRequest}
        name={name}
        listType={listType}
        beforeUpload={beforeUpload}
        onChange={onChange}
        fileList={fileList}
        showUploadList={showUploadList}
        maxCount={maxCount}
        className={classNames('inner', className)}>
        {children}
      </Upload>
      <div className='icon-upload'>
        <CloudUploadOutlined />
      </div>
    </div>
  );
};
