/* eslint-disable @typescript-eslint/no-misused-promises */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
// hooks
// import { useTranslations } from "next-intl";
// libs
import { v4 as uuidv4 } from 'uuid';

// types
import { customRequest } from './helper';
// import { pushNotify } from "@/utils/toast";
import { getExtension, getFileType, getImageUrl } from './index';
// model
import { type Attachment } from './index';

interface Props {
  filePath: string;
  onChange?: (fileList: any) => void;
  value?: Attachment;
  accept?: string;
}

export const UploadAvatar = (props: Props) => {
  // const t = useTranslations();
  const { filePath } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (props?.value?.imageUrl) {
      setImageUrl(getImageUrl(props?.value?.imageUrl));
    }
  }, [props.value?.imageUrl]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // pushNotify(`${t("You can only upload")} JPG/PNG file!`, {
      //   type: "warning",
      // });
      console.log(`${'You can only upload'} JPG/PNG file!`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // pushNotify(`${t("File must smaller than")} 2MB!`, { type: "warning" });
      console.log(`${'File must smaller than'} 2MB!`);
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile & Attachment & any>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(`${process.env.CDN_STORAGE_URL}/${info?.file?.imageUrl || info?.file?.xhr}`);
      const fileList: Attachment = {
        _id: uuidv4(),
        imageUrl: info.file.xhr,
        name: info.file.name,
        extension: getExtension(info.file.xhr),
        type: getFileType(info.file.name),
      };
      if (props.onChange) props.onChange(fileList);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name='avatar'
      listType='picture-circle'
      className='avatar-uploader'
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={async (config: any) => {
        await customRequest(filePath, config);
      }}
      accept={props?.accept}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='avatar'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

// export default UploadAvatar;
