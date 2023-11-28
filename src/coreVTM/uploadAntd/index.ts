// import { HttpClient } from "libs/axios";
// import { getExtension } from "@/utils/file.utility";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return undefined;
  if (!imagePath.startsWith('/')) {
    imagePath = `/${imagePath}`;
  }
  //   const cdnURL = process.env.CDN_STORAGE_URL;
  //   const imageUrl = `${cdnURL}${imagePath}`;
  const imageUrl = `${imagePath}`;
  return imageUrl;
};

export const getImageOrientation = async (file: any) => {
  try {
    return await new Promise<'landscape' | 'portrait'>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const orientation = width > height ? 'landscape' : 'portrait';
        resolve(orientation);
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    });
  } catch (error) {}
};

export type AttachmentType = 'File' | 'Image' | 'Video' | 'Form' | 'Signature';

export const getFileType = (filename: string): AttachmentType => {
  return filename?.match(/.(jpg|jpeg|png|gif|webp)$/i) ? 'Image' : 'File';
};

export const getExtension = (path: string) => {
  if (!path) return '';
  const components = path?.split('.');
  const extension = !components.length ? '' : components[components.length - 1];
  return extension;
};

export const downloadFile = async (url: string, filename: string) => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};
export interface Entity {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  vi?: string;
  en?: string;
  system?: boolean;
  active?: boolean;
  locked?: boolean;
  createdAt?: Date;
  createdBy?: {
    _id: string;
    name: string;
  };
  updatedAt?: Date;
  updatedBy?: {
    _id: string;
    name: string;
  };
}

export interface Attachment extends Entity {
  imageUrl?: string;
  type?: AttachmentType;
  extension?: string;
  isCover?: boolean;
}

export const customRequest = async (filePath: string, { file, onError, onProgress, onSuccess, fileSize }: any) => {
  const fileId = uuidv4();
  const path = `/oms-web${`${filePath.startsWith('/') ? filePath : `/${filePath}`}`}/${fileId}.${getExtension(
    file.name,
  )}`;
  const MB = 1000000;

  const awsResponse = await axios<any>(
    `${process.env.OMS_WEB_API_URL}/aws/upload?filePath=${path}&contentType=${file.type}&fileSize=${fileSize * MB}`,
    {
      method: 'GET',
    },
  );

  const { url, fields } = awsResponse.data;
  const data = new FormData();
  for (const key in fields) {
    if (Object.hasOwnProperty.call(fields, key)) {
      data.append(key, fields[key]);
    }
  }
  data.append('file', file);

  fetch(url, {
    method: 'POST',
    body: data,
  })
    .then((response: any) => {
      const reader = response.body.getReader();
      const contentLength = response.headers.get('Content-Length');
      let receivedLength = 0;

      return reader.read().then(function processResult(result: any) {
        if (result.done) {
          onSuccess(result.done, fields.key);
          console.log('Request completed');
          return;
        }
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        receivedLength += result.value.length;
        console.log(`Received ${receivedLength} bytes of ${contentLength}`);
        onProgress(
          {
            percent: Math.round((receivedLength / contentLength) * 100),
          },
          file,
        );
        return reader.read().then(processResult);
      });
    })
    .catch(error => {
      console.error('Error occurred:', error);
      onError();
    });
};
