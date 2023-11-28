import React from 'react';

import mapModifiers from '@/utils/Functions';

type NameIcon = 'loader' | 'home' | 'error';
type SizeIcon = '18x18' | '24x24' | '32x32';

interface IconProps {
  name?: NameIcon;
  size?: SizeIcon;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size, className }) => {
  return <i className={mapModifiers('a-icon', size, name, className)}></i>;
};
export default Icon;
