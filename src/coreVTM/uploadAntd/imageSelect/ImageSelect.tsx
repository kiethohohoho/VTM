import React, { useState } from 'react';

import { customRequest } from '../helper';

export const SingleFileUploader = ({
  onChange,
}: {
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  filePath?: string;
  disabled?: boolean;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      const fileSelected = e?.target?.files?.[0];
      setFile(fileSelected);
      customRequest('hoa-test-cho-vui', {
        file: fileSelected,
        onError: () => {},
        onProgress: (v1: any) => {
          console.log(v1);
        },
        onSuccess: (response: any) => {
          onChange?.(response);
        },
        fileSize: 2,
      });
    }
  };

  return (
    <>
      <div className='input-group'>
        <label
          htmlFor='file'
          className='sr-only'>
          Choose a file
        </label>
        <input
          id='file'
          type='file'
          accept='image/png,image/jpeg,image/gif'
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;
