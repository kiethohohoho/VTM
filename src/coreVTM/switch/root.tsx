import { Switch, type SwitchProps } from 'antd';

interface SwitchRootAntDProps extends SwitchProps {
  customClassName?: string;
  handleOnChange?: (checked: boolean) => void;
  handleOnClick?: () => void;
  name?: string;
  valuePropName?: string;
  labelLeft?: string;
  labelRight?: string;
}

const SwitchRootAntD: React.FC<SwitchRootAntDProps> = ({
  customClassName,
  handleOnChange,
  handleOnClick,
  labelLeft,
  labelRight,
  name,
  valuePropName,
  ...props
}) => {
  return (
    <div>
      {labelLeft && <span>{labelLeft}</span>}
      <Switch
        className={customClassName}
        onChange={handleOnChange}
        onClick={handleOnClick}
        {...props}></Switch>
      {labelRight && <span>{labelRight}</span>}
    </div>
  );
};

export default SwitchRootAntD;
