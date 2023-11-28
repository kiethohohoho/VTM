import { type TableProps } from 'antd';
import { type ColumnsType, type TablePaginationConfig } from 'antd/es/table';

export interface TableCommonProps extends TableProps<any> {
  height?: number | string;
  dataSource?: readonly any[] | undefined;
  columns?: ColumnsType<any> | undefined;
  pagination?: false | TablePaginationConfig | undefined;
}
