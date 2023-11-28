import { type CollapseProps } from 'antd';
import { type ReactNode } from 'react';

export interface collapseItem {
  key: string | number;
  header?: string;
  content?: ReactNode | any;
}
export interface CollapsePropsCommon extends CollapseProps {
  items?: collapseItem[];
  onChange?: any;
}
