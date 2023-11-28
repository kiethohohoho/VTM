// import './CollapseCommon.scss';

import { RightCircleOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { type CollapsePropsCommon } from './type';
export const CollapseCommon = ({
  items = [],
  activeKey,
  onChange,
  defaultActiveKey,
  bordered = false,
}: CollapsePropsCommon) => {
  const handleChangeCb = () => {
    onChange && onChange();
  };
  return (
    <Collapse
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={handleChangeCb}
      className='collapse-common'
      bordered={bordered}
      expandIcon={({ isActive }) => <RightCircleOutlined rotate={isActive ? 90 : 0} />}>
      {items.map(item => (
        <Collapse.Panel
          header={item?.header}
          key={item?.key}>
          {item?.content}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};
