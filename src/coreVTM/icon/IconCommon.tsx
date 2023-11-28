import classNames from 'classnames';

import { type IconProps } from './type';
const IconCommon: React.FC<IconProps> = ({ children, className }) => {
  return <div className={classNames('icon-common', className)}>{children}</div>;
};

export default IconCommon;
