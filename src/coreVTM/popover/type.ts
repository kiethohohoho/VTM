import { type ReactNode } from 'react';

export interface PopoverCommonProps {
  open?: boolean;
  content: ReactNode;
  placement?: any;
  trigger?: any;
  title?: string;
  className?: string;
  mouseLeaveDelay?: number;
  children: ReactNode;
  onOpenChange?: (visible: boolean) => void;
}
