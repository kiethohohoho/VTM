import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { getExtension } from './index';

export const customRequest = async (filePath: string, { file, onError, onProgress, onSuccess, fileSize }: any) => {
  try {
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
    const formData: FormData = new FormData();
    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        formData.append(key, fields[key]);
      }
    }
    formData.append('file', file);

    await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: any) => {
        const percent = Math.round((progressEvent?.loaded / progressEvent?.total) * 100);
        onProgress(
          {
            percent,
            finish: percent === 100,
          },
          file,
        );
      },
      transformRequest: (data, headers) => {
        delete headers.Authorization;
        delete headers.timezone;
        delete headers['X-TENANT-ID'];
        return data;
      },
    });
    file.imageUrl = path;
    onSuccess(file);
  } catch (error) {
    onError(error);
  }
};
