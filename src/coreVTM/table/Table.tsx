import { Table } from 'antd';

import { type TableCommonProps } from './types';

const TableCommon = (props: TableCommonProps) => {
  const { height, ...rest } = props;
  return (
    <Table
      className='table-common'
      scroll={{ y: height }}
      {...rest}
    />
  );
};

export default TableCommon;
