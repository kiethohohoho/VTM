import { Popover } from 'antd';

import { type PopoverCommonProps } from './type';

const PopoverCommon: React.FC<PopoverCommonProps> = ({
  open,
  content,
  placement,
  trigger = 'hover',
  title,
  className = '',
  mouseLeaveDelay,
  children,
  onOpenChange,
  ...props
}: PopoverCommonProps) => {
  if (open !== undefined) {
    return (
      <Popover
        open={open}
        overlayClassName={`${className} popover-common`}
        content={content}
        title={title}
        trigger={trigger}
        placement={placement}
        mouseLeaveDelay={mouseLeaveDelay}
        onOpenChange={onOpenChange}
        {...props}>
        {children}
      </Popover>
    );
  }

  return (
    <Popover
      overlayClassName={`${className} popover-common`}
      content={content}
      title={title}
      trigger={trigger}
      placement={placement}
      mouseLeaveDelay={mouseLeaveDelay}
      onOpenChange={onOpenChange}
      {...props}>
      {children}
    </Popover>
  );
};

export default PopoverCommon;
