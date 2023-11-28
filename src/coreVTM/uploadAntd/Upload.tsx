/* eslint-disable @typescript-eslint/no-misused-promises */
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload as AUpload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useMemo, useState } from 'react';
// hooks
// import { useTranslations } from "next-intl";
// libs
import { v4 as uuidv4 } from 'uuid';

// types
import { customRequest } from './helper';
// import { pushNotify } from "@/utils/toast";
import { getExtension, getFileType, getImageOrientation } from './index';
// icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";
// model
import { type Attachment } from './index';

type FileType =
  | 'image/jpeg'
  | 'image/png'
  | 'application/pdf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

type OrientationType = 'landscape' | 'portrait';

export interface Props {
  templateUrl?: string;
  maxCount: number;
  minCount?: number;
  filePath?: string;
  fileType?: FileType[];
  fileSize?: number; // 1MB 2MB
  fileOrientation?: OrientationType[];
  onChange?: (fileList: any) => void;
  fileList?: any;
  value?: any;
  className?: string;
}

export const Upload = (props: Props) => {
  // const t = useTranslations();
  const { maxCount, filePath, fileType, fileSize, fileOrientation, value } = props;
  const [fileList, setFileList] = useState<any[]>(props.fileList);
  console.log('fileList', fileList);
  const [loadInitData, setLoadInitData] = useState<boolean>(true);

  useEffect(() => {
    if (loadInitData) {
      if (maxCount > 1 && value?.length > 0) {
        //
        const fileList = value.map((item: any) => {
          return {
            ...item,
            name: item?.name || item?.imageUrl,
            extension: item?.extension || getExtension(item?.imageUrl),
          };
        });
        setFileList(fileList);
      }
      if (maxCount === 1 && value && value?._id) {
        const fileList = [
          {
            ...value,
            name: value?.name || value?.imageUrl,
            extension: value?.extension || getExtension(value?.imageUrl),
          },
        ];
        setFileList(fileList);
      }
    }
  }, [loadInitData, maxCount, value]);

  const acceptedFileTypesString = useMemo(() => {
    return fileType
      ?.map(mimeType => {
        switch (mimeType) {
          case 'image/jpeg':
            return 'jpeg';
          case 'image/png':
            return 'png';
          case 'application/pdf':
            return 'pdf';
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'xlsx';
          default:
            return '';
        }
      })
      .join(' / ');
  }, [fileType]);

  const beforeUpload = async (file: RcFile) => {
    if (fileOrientation) {
      const orientation = await getImageOrientation(file);
      const isValidFileOrientation = fileOrientation.includes(orientation as OrientationType);
      if (!isValidFileOrientation) {
        // pushNotify(t("The image is invalid"), {
        //   type: "warning",
        // });
        console.log('The image is invalid');
        return AUpload.LIST_IGNORE;
      }
    }
    if (fileType) {
      const isValidFileType = fileType.includes(file.type as FileType);
      if (!isValidFileType) {
        // pushNotify(
        //   `${t("You can only upload")} ${acceptedFileTypesString} file!`,
        //   {
        //     type: "warning",
        //   }
        // );
        console.log(`${'You can only upload'} ${acceptedFileTypesString} file!`);
        return AUpload.LIST_IGNORE;
      }
    }
    if (fileSize) {
      const isValidFileSize = file.size / 1024 / 1024 < fileSize;
      if (!isValidFileSize) {
        // pushNotify(`${t("File must smaller than")} ${fileSize}MB!`, {
        //   type: "warning",
        // });
        console.log('file quá nhỏ');
        return AUpload.LIST_IGNORE;
      }
    }
    if (maxCount && fileList.length >= maxCount) {
      // pushNotify(`${t("Only allowed to upload up to")} ${maxCount} files.`, {
      //   type: "warning",
      // });
      console.log('file vượt quá dung lượng');
      return AUpload.LIST_IGNORE;
    }
    return true;
  };

  const config: UploadProps = {
    name: 'file',
    multiple: true,
    maxCount,
    fileList,
    accept: fileType?.join(','),
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        /* empty */
      }
      if (status === 'done') {
        // pushNotify(`${info.file.name} ${t("file uploaded successfully")}`);
        // message success
        const fileList: Attachment[] = info.fileList.map((item: any) => {
          return {
            _id: uuidv4(),
            imageUrl: item?.imageUrl || item?.xhr,
            name: item.name || item?.imageUrl || item?.xhr,
            extension: getExtension(item?.imageUrl || item?.xhr),
            type: getFileType(item?.name || item?.imageUrl || item?.xhr),
          };
        });
        if (props.onChange) {
          if (maxCount === 1) {
            props.onChange(fileList.length > 0 ? fileList[0] : undefined);
          } else {
            props.onChange(fileList);
          }
        }
      } else if (status === 'error') {
        // pushNotify(`${info.file.name} ${t("file upload failed")}`, {
        //   type: "error",
        // });
        // message error
        console.log('send error');
      }
      setFileList([...info.fileList]);
      setLoadInitData(false);
    },
    customRequest: async (config: any) => {
      await customRequest(filePath || '', { ...config, fileSize });
    },
    beforeUpload,
  };

  return (
    <AUpload {...config}>
      <Button icon={<CloudUploadOutlined />}></Button>
    </AUpload>
  );
};

Upload.defaultProps = {
  maxCount: 5,
  fileSize: 2,
  fileList: [],
  filePath: '/',
};

// export default Upload;
