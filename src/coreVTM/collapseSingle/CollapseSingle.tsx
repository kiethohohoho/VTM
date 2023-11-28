// import './CollapseSingleCommon.scss';

import { RightCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { type CollapseProps } from 'antd';
import classNames from 'classnames';
import { type ReactNode } from 'react';

export interface CollapsePropsCommon extends CollapseProps {
  key: string | number;
  header?: React.ReactNode;
  onChange?: any;
  type?: 'default' | 'light' | 'transparent' | string;
  isOpen?: boolean;
  extra?: ReactNode;
}
export const CollapseSingleCommon = ({
  onChange,
  isOpen = true,
  header,
  extra,
  type = 'default',
}: CollapsePropsCommon) => {
  const handleChangeCb = () => {
    onChange && onChange();
  };

  return (
    <Collapse
      defaultActiveKey={isOpen ? ['1'] : undefined}
      onChange={handleChangeCb}
      className={classNames('collapse-single-common', `type-${type}`)}
      expandIcon={({ isActive }) => <RightCircleOutlined rotate={isActive ? 90 : 0} />}
      expandIconPosition='right'>
      <Collapse.Panel
        header={header}
        key='1'>
        {extra}
      </Collapse.Panel>
    </Collapse>
  );
};
