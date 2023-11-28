/* eslint-disable react/display-name */
import { Tag, type TagProps } from 'antd';
import classNames from 'classnames';
import { type FC, memo, type MouseEventHandler, type ReactNode } from 'react';

interface TagCommonProps extends TagProps {
  color?: string;
  onClick?: MouseEventHandler;
  className?: string;
  size?: string;
  children: ReactNode;
}
const TagCommon: FC<TagCommonProps> = memo(({ color = 'green', children, onClick, className = '', size = '' }) => {
  return (
    <Tag
      className={classNames('tag-common', className, {
        [`size-${size}`]: size,
      })}
      color={color}
      onClick={onClick}>
      {children}
    </Tag>
  );
});

export default TagCommon;
