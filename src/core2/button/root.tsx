import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import React from 'react';

import { Localize } from '@/context/languages';

import { type IButtonRoot } from './types';
const ButtonRoot: React.FC<IButtonRoot> = ({
  text,
  children,
  themeColor,
  loading,
  loadingThemeColor = 'primary',
  className,
  ...other
}) => {
  return (
    <Button
      themeColor={themeColor}
      className={`${loading && `bg-${themeColor}-focus-lv2`} ${className}`}
      {...other}>
      {loading ? (
        <Loader
          size={'small'}
          className='text-primary p-0'
          type='converging-spinner'
          themeColor={loadingThemeColor}
        />
      ) : (
        children || <Localize tid={text || ''} />
      )}
    </Button>
  );
};

export default ButtonRoot;
