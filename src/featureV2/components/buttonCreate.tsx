import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonRoot } from '@/core2/button';
import { type IButtonRoot } from '@/core2/button/types';

interface IButtonCreate extends IButtonRoot {
  path: string;
}

const ButtonCreate: React.FC<IButtonCreate> = ({ text = 'create', path, ...other }) => {
  const navigate = useNavigate();
  return (
    <ButtonRoot
      themeColor={'primary'}
      onClick={() => {
        navigate(path);
      }}
      text={text}
      {...other}
    />
  );
};

export default ButtonCreate;
