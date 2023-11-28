import { Tabs, type TabsProps } from 'antd';

interface TabsRootAntDProps extends TabsProps {
  className?: string;
}

const TabsRootAntD: React.FC<TabsRootAntDProps> = ({ className, items, defaultActiveKey, onChange, ...props }) => {
  return (
    <Tabs
      className={className}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      items={items}
      {...props}></Tabs>
  );
};

export default TabsRootAntD;
