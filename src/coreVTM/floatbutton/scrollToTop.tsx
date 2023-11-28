import { FloatButton, type FloatButtonProps } from 'antd';

interface FloatButtonAntDProps extends FloatButtonProps {
  visibility?: number;
}

const ScrollToTopFloat: React.FC<FloatButtonAntDProps> = ({ visibility }) => {
  return <FloatButton.BackTop visibilityHeight={visibility}></FloatButton.BackTop>;
};

export default ScrollToTopFloat;
