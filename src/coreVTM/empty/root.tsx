import { Empty, type EmptyProps } from 'antd';

interface EmptyRootAntDProps extends EmptyProps {}

const EmptyRootAntD: React.FC<EmptyRootAntDProps> = ({ ...props }) => {
  return <Empty {...props} />;
};

export default EmptyRootAntD;
