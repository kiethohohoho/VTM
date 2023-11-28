import React from 'react';

import { ButtonRoot } from '@/core2/button';
import { type IButtonRoot } from '@/core2/button/types';

interface IButtonSubmitForm extends IButtonRoot {}

const ButtonSubmitForm: React.FC<IButtonSubmitForm> = ({ text = 'profile.submit', type = 'submit', ...other }) => {
  return (
    <ButtonRoot
      themeColor={'success'}
      type={type}
      text={text}
      {...other}
    />
  );
};

export default ButtonSubmitForm;
