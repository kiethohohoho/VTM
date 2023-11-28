import { FloatButton } from 'antd';

import { type FloatButtonAntDProps } from './types';
const FloatButtonRootAntD: React.FC<FloatButtonAntDProps> = ({ customClass, ...props }) => {
  return (
    <FloatButton
      {...props}
      className={customClass}
    />
  );
};

export default FloatButtonRootAntD;
