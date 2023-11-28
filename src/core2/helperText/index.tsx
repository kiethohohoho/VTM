import { Error } from '@progress/kendo-react-labels';
import React from 'react';

import warning from '@/assets/images/icon/alert-triangle.svg';
import success from '@/assets/images/icon/done.svg';
import error from '@/assets/images/icon/error.svg';
import info from '@/assets/images/icon/info.svg';
import loading from '@/assets/images/icon/loader.svg';

import { type ColorBasic } from '../common/type';

interface IErrorHelperText {
  errorMessage?: string;
  typeColor?: ColorBasic;
  isError?: boolean;
  helperText?: string;
}
const iconRender: Record<ColorBasic, string> = {
  primary: '',
  default: '',
  danger: error,
  info,
  loading,
  success,
  warning,
};

const ErrorHelperText: React.FC<IErrorHelperText> = ({ errorMessage, typeColor, isError }) => {
  return (
    <Error
      className={`flex items-center gap-1 bg-${
        !isError ? 'transparent' : `${typeColor}-bg-color`
      } p-1 rounded-md text-${typeColor} h-4`}>
      {isError && <img src={iconRender[typeColor || 'default']} />}
      <span
        style={{
          fontSize: '12px',
        }}>
        {isError && errorMessage}
      </span>
    </Error>
  );
};

export default ErrorHelperText;
