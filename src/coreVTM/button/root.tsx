import { Button } from 'antd';
import React from 'react';

import { type AntDButtonRoot } from './type';

const ButtonRootAntD: React.FC<AntDButtonRoot> = ({ customClass, ...props }) => {
  return (
    <Button
      className={customClass}
      {...props}
    />
  );
};

export default ButtonRootAntD;
