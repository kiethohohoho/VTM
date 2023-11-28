import { Spin, type SpinProps } from 'antd';

interface LoaderRootAntDProps extends SpinProps {
  customClassName?: string;
}

const LoaderRootAntD: React.FC<LoaderRootAntDProps> = ({ customClassName, indicator, ...props }) => {
  return (
    <Spin
      indicator={indicator}
      className={customClassName}
      {...props}
    />
  );
};
export default LoaderRootAntD;
