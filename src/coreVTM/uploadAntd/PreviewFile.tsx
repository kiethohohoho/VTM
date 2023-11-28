import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined } from '@ant-design/icons';
import { Image, Modal } from 'antd';
// interface
import type { UploadFile } from 'antd/es/upload/interface';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

// components
// import { Modal } from "@/components/common";
// icons
// utils
import { getExtension, getFileType, getImageUrl } from './index';
import { type Attachment } from './index';
// import styles from './styles.module.scss';
interface Props {
  open: boolean;
  fileListPreview: UploadFile[] & Attachment[];
  onClose: () => void;
  fileSelected?: UploadFile & Attachment & any;
}

export const PreviewFile = (props: Props) => {
  const { open, fileListPreview } = props;
  const [fileSelected, setFileSelected] = useState<UploadFile & Attachment>();

  const handleChangeFileSelected = useCallback((file: UploadFile & Attachment) => {
    setFileSelected(file);
  }, []);

  useEffect(() => {
    setFileSelected(props.fileSelected);
  }, [props.fileSelected]);

  const fileTypeSelected = useMemo(() => {
    return getFileType(fileSelected?.name as string);
  }, [fileSelected]);

  const fileUrl = useMemo(() => {
    const fileExtension = getExtension(fileSelected?.name as string);
    if (fileExtension === 'pdf') {
      return `${process.env.CDN_STORAGE_URL}/${fileSelected?.imageUrl || fileSelected?.xhr}`;
    } else if (['docx', 'xlsx'].includes(fileExtension)) {
      //   return `${process.env.VIEW_OFFICE_APP}${process.env.CDN_STORAGE_URL}/${
      //     fileSelected?.imageUrl || fileSelected?.xhr
      //   }`;
      console.log('get url success');
    }
  }, [fileSelected]);
  console.log('fileUrl', fileUrl);
  return (
    <Modal
      centered
      title={null}
      width='90vw'
      open={open}
      onCancel={props.onClose}
      cancelText={null}
      okText={null}
      footer={null}
      className='modal'>
      <div className='container'>
        <div className='left'>
          {fileTypeSelected === 'Image' && (
            <Image
              alt=''
              //   fill
              //   priority
              placeholder='blur'
              //   blurDataURL="/images/default/blur.jpg"
              className='preview'
              src={getImageUrl(`${fileSelected?.xhr || fileSelected?.imageUrl}`) as string}
            />
          )}
          {fileTypeSelected === 'File' && (
            <iframe
              src={fileUrl}
              width='100%'
              height='100%'
              title={fileSelected?.name}
            />
          )}
        </div>
        <div className='right'>
          {fileListPreview.map((file: UploadFile & Attachment & any, key: number) => {
            const fileType = getFileType(file.name);
            const fileExtension = getExtension(file.name);
            return (
              <div
                key={key}
                className='item-render'>
                {fileType === 'Image' && (
                  <Image
                    key={key}
                    // className={classNames({
                    //   [styles.file]: true,
                    //   [styles["file-selected"]]:
                    //     (file.uid === fileSelected?.uid && file.uid) ||
                    //     (file._id === fileSelected?._id && file._id),
                    // })}
                    alt=''
                    // fill
                    // priority
                    placeholder='blur'
                    // blurDataURL='/images/default/blur.jpg'
                    src={getImageUrl(`${file?.xhr || file?.imageUrl}`) as string}
                    onClick={() => {
                      handleChangeFileSelected(file);
                    }}
                  />
                )}
                {fileType === 'File' && (
                  <div
                    key={key}
                    className={classNames({
                      file: true,
                      'file-selected': file.uid === fileSelected?.uid,
                    })}
                    onClick={() => {
                      handleChangeFileSelected(file);
                    }}>
                    <>
                      {fileExtension === 'docx' && <FileTextOutlined className='' />}
                      {fileExtension === 'pdf' && <FilePdfOutlined className='' />}
                      {fileExtension === 'xlsx' && <FileExcelOutlined className='' />}
                    </>
                  </div>
                )}
                {/* <div className={styles["item-render-action"]}>
                  <DownloadOutlined onClick={() => handleDownloadFile(file)} />
                </div> */}
                {/* <div className={styles['item-render-blur']} /> */}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

// export default PreviewFile;
