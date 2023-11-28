import React from 'react';

import logo from '@/assets/imagesV2/common/logo.png';

interface ILogoIcon {
  className?: string;
}

const LogoIcon: React.FC<ILogoIcon> = ({ className }) => {
  return (
    <img
      className={`w-20 ${className}`}
      src={logo}
    />
  );
};

export default LogoIcon;
