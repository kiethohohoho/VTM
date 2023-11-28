import { Breadcrumb, type BreadcrumbProps } from 'antd';
import { type ReactNode } from 'react';

interface BreadcrumbRootAntDProps extends BreadcrumbProps {
  separator?: ReactNode;
  customClassName?: string;
}

const BreadcrumbRootAntD: React.FC<BreadcrumbRootAntDProps> = ({ customClassName, separator, items, ...props }) => {
  return (
    <Breadcrumb
      className={customClassName}
      separator={separator}
      items={items}
      {...props}
    />
  );
};

export default BreadcrumbRootAntD;
