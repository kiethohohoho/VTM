import { Flex } from 'antd';
import React from 'react';

import { QRCodeRootAntD } from '@/coreVTM/qrcode';

import { type actionModalQrProps } from '../type';
const LoginWithQrCode = ({ handleCloseModalQr, handleSubmit, visibleModalQr, width }: actionModalQrProps) => {
  return (
    <Flex
      justify='center'
      align='center'
      style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <QRCodeRootAntD
        style={{ width: '100%', height: '100%' }}
        value={'https://ant.design/'}
      />
    </Flex>
  );
};
export default LoginWithQrCode;
