import { Dropdown, type DropdownProps } from 'antd';
import { type ItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import { type FC, type ReactNode } from 'react';
export interface DropdownItem {
  name: string;
  active: boolean;
  content: ReactNode;
}

interface DropdownCommonProps extends DropdownProps {
  children?: ReactNode;
  menuItem?: DropdownItem[];
  isHideOption?: boolean;
  items?: ItemType[];
  // Add any other props you want to pass to the Dropdown component here
}

const DropdownCommon: FC<DropdownCommonProps> = ({ children, menuItem = [], isHideOption, ...props }) => {
  const menuOverlay = (
    <div className='dropdown-common-wrap'>
      {!isHideOption &&
        menuItem.map((item, index) => (
          <div
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            key={item?.name + index}
            className={classNames({
              'dropdown-common-item': true,
              active: item.active,
            })}>
            {item.content}
          </div>
        ))}
    </div>
  );

  return (
    <Dropdown
      className='dropdown-common'
      dropdownRender={() => menuOverlay}
      {...props}>
      {/* GG icon */}
      <div className='dropdown-children'>{children}</div>
      {/* {children} */}
    </Dropdown>
  );
};

export default DropdownCommon;
