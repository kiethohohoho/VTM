import { Pagination, type PaginationProps } from 'antd';

interface PaginationRootAntDProps extends PaginationProps {
  className?: string;
  current?: number;
  total?: number;
  pageSize?: number;
  onChange: (page: number, pageSize: number) => void;
}

const PaginationRootAntD: React.FC<PaginationRootAntDProps> = ({
  className,
  current,
  total,
  pageSize,
  onChange,
  ...props
}) => {
  const handleOnChange = (page: number, pageSize: number) => {
    onChange(page, pageSize);
  };
  return (
    <Pagination
      current={current}
      total={total}
      className={className}
      onChange={handleOnChange}
      {...props}></Pagination>
  );
};

export default PaginationRootAntD;
