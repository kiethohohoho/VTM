import React from 'react';

import eyeAlt from '@/assets/images/icon/eye-alt.svg';

import InputRoot from './root';
import { type IInputRoot } from './types';

interface IInputPassword extends IInputRoot {}

interface IStateInputPassword {
  isShowPassword: boolean;
  type: 'text' | 'password';
}
const InputPassword: React.FC<IInputPassword> = ({ name, ...other }) => {
  const initialStateInputPassword: IStateInputPassword = React.useMemo(() => {
    return {
      isShowPassword: false,
      type: 'password',
    };
  }, []);
  const [state, setState] = React.useState<IStateInputPassword>(initialStateInputPassword);

  const handleToggleShowPassword = () => {
    setState(prev => {
      return {
        isShowPassword: !prev.isShowPassword,
        type: !prev.isShowPassword ? 'text' : 'password',
      };
    });
  };

  return (
    <div className='relative w-full'>
      <InputRoot
        type={state.type}
        {...other}
        name={name}
      />
      <div
        onClick={handleToggleShowPassword}
        className='absolute top-1/2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer'>
        <img src={eyeAlt} />
      </div>
    </div>
  );
};

export default InputPassword;
