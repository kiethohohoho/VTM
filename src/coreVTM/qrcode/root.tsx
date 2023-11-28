import { QRCode, type QRCodeProps } from 'antd';

interface QRCodeRootAntDProps extends QRCodeProps {}

const QRCodeRootAntD: React.FC<QRCodeRootAntDProps> = ({ ...props }) => {
  return <QRCode {...props} />;
};

export default QRCodeRootAntD;
