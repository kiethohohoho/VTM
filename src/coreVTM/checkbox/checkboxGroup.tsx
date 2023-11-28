import { Checkbox } from 'antd';
import { type CheckboxGroupProps } from 'antd/lib/checkbox';

interface CheckboxGroupRootAntDProps extends CheckboxGroupProps {
  className?: string;
  options?: Array<{ label: string; value: string }>;
}

const CheckboxGroupAntD: React.FC<CheckboxGroupRootAntDProps> = ({ options, className, ...props }) => {
  return (
    <Checkbox.Group
      className={className}
      options={options}
      {...props}
    />
  );
};

export default CheckboxGroupAntD;
