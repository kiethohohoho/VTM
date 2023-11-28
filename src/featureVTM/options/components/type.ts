import { type ReactNode } from 'react';

interface optionProps {
  type?: number;
  option?: string;
  linkTo?: any;
}
export interface dataOption {
  title?: string;
  optionname?: optionProps[];
}
export interface ModalOptionProps {
  openModal?: boolean;
  closeModal?: (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void;
  options?: ReactNode;
  data?: dataOption[];
  content?: string;
}
