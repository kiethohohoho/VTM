import { Card, type CardProps } from 'antd';

interface CardRootAntDProps extends CardProps {
  className?: string;
  title?: string;
}

const CardRootAntD: React.FC<CardRootAntDProps> = ({ children, title, className, ...props }) => {
  return (
    <Card
      className={className}
      {...props}
      title={title}>
      {children}
    </Card>
  );
};

export default CardRootAntD;
