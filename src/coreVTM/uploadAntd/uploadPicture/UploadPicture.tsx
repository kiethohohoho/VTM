import './styles.scss';

import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Modal, Progress, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { type ReactElement, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import { pushNotify } from "@/utils/toast";
// import { useTranslations } from "next-intl";
import { customRequest } from '../helper';
import { type Attachment, getExtension, getFileType, getImageOrientation, getImageUrl } from '../index';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const getBase64 = async (file: RcFile): Promise<string> =>
  await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = error => {
      reject(error);
    };
  });

type FileType =
  | 'image/jpeg'
  | 'image/png'
  | 'application/pdf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

type OrientationType = 'landscape' | 'portrait';

const UploadPicture = ({
  maxCount = 1,
  fileSize = 2,
  filePath = '/',
  fileType,
  fileOrientation,
  value,
  //   className,
  onChange,
  disabled = false,
}: {
  fileSize?: number;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  filePath?: string;
  fileType?: FileType[];
  maxCount?: number;
  minCount?: number;
  files?: any;
  fileOrientation?: OrientationType[];
  disabled?: boolean;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [loadInitData, setLoadInitData] = useState<boolean>(true);
  //   const t = useTranslations();
  useEffect(() => {
    if (loadInitData) {
      if (maxCount > 1 && value?.length > 0) {
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

    return () => {
      setLoadInitData(true);
    };
  }, [value]);

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
        // pushNotify(t('The image is invalid'), {
        //   type: 'warning',
        // });
        console.log('The image is invalid');
        return Upload.LIST_IGNORE;
      }
    }
    if (fileType) {
      const isValidFileType = fileType.includes(file.type as FileType);
      if (!isValidFileType) {
        // pushNotify(`${'You can only upload'} ${acceptedFileTypesString} file!`, {
        //   type: 'warning',
        // });
        console.log(`${'You can only upload'} ${acceptedFileTypesString} file!`);
        return Upload.LIST_IGNORE;
      }
    }
    if (fileSize) {
      const isValidFileSize = file.size / 1024 / 1024 < fileSize;
      if (!isValidFileSize) {
        // pushNotify(`${t('File must smaller than')} ${fileSize}MB!`, {
        //   type: 'warning',
        // });
        console.log(`${'File must smaller than'} ${fileSize}MB!`);
        return Upload.LIST_IGNORE;
      }
    }
    if (maxCount && fileList.length >= maxCount) {
      //   pushNotify(`${t('Only allowed to upload up to')} ${maxCount} files.`, {
      //     type: 'warning',
      //   });
      console.log(`${'Only allowed to upload up to'} ${maxCount} files.`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = info => {
    const { status } = info.file;
    if (status === 'uploading') {
      setPercent(0);
    }
    if (status === 'done') {
      // pushNotify(`${info.file.name} ${t("file uploaded successfully")}`);
      console.log(`${info.file.name} ${'file uploaded successfully'}`);
      const fileList: Attachment[] = info.fileList
        ?.filter((item: any) => {
          return item?.imageUrl || item?.xhr;
        })
        ?.map((item: any) => {
          return {
            _id: uuidv4(),
            imageUrl: item?.imageUrl || item?.xhr,
            name: item.name || item?.imageUrl || item?.xhr,
            extension: getExtension(item?.imageUrl || item?.xhr),
            type: getFileType(item?.name || item?.imageUrl || item?.xhr),
          };
        });
      if (onChange) {
        if (maxCount === 1) {
          onChange(fileList.length > 0 ? fileList[0] : undefined);
        } else {
          onChange(fileList);
        }
      }
    } else if (status === 'error') {
      //   pushNotify(`${info.file.name} ${t('file upload failed')}`, {
      //     type: 'error',
      //   });
      console.log(`${info.file.name} ${'file upload failed'}`);
    }
    setFileList([...info.fileList]);
    setLoadInitData(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const itemRender = (
    _originNode: ReactElement,
    file: UploadFile & Attachment & any,
    _fileList: object[],
    actions: { download: any; preview: any; remove: any },
  ) => {
    const onDelete = () => {
      actions.remove();
      let _fileList: any = [...fileList];
      if (_fileList?.length === 1) {
        onChange?.(null);
        setFileList([]);
      } else {
        // eslint-disable-next-line eqeqeq
        const index = _fileList.findIndex((item: any) => item._id == file._id || item.uid === file.uid);
        if (index > -1) {
          _fileList.splice(index, 1);
          _fileList = _fileList.map((item: any) => {
            return {
              _id: uuidv4(),
              imageUrl: item?.imageUrl || item?.xhr,
              name: item.name || item?.imageUrl || item?.xhr,
              extension: getExtension(item?.imageUrl || item?.xhr),
              type: getFileType(item?.name || item?.imageUrl || item?.xhr),
            };
          });
          setFileList(_fileList);
          if (onChange) {
            if (maxCount === 1) {
              onChange(_fileList.length > 0 ? _fileList[0] : undefined);
            } else {
              onChange(_fileList);
            }
          }
        }
      }
    };
    if (file?.imageUrl || file?.xhr) {
      return (
        <div
          key={file._id || file.uid}
          className='item-render'>
          <img
            src={getImageUrl(file?.imageUrl || file?.xhr)}
            alt={file?.name || ''}
          />
          <div className='item-render__action'>
            {!disabled && (
              <UpCircleOutlined
                className='color-neutral-600 pointer'
                style={{ fontSize: 20 }}
                onClick={onDelete}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className='h-100 w-100 d-flex justify-center align-center'>
          <Progress
            percent={percent}
            type='circle'
            size={'small'}
          />
        </div>
      );
    }
  };

  const onProgress = (
    {
      percent,
    }: {
      percent: number;
      finish: boolean;
    },
    _file: any,
  ) => {
    setPercent(percent);
  };

  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onPreview={handlePreview}
        onChange={handleChange}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        customRequest={async (config: any) => {
          await customRequest(filePath || '', {
            ...config,
            fileSize,
            onProgress,
          });
        }}
        beforeUpload={beforeUpload}
        itemRender={itemRender}
        className='upload'
        disabled={disabled}
        multiple={false}>
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img
          alt='example'
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default UploadPicture;
