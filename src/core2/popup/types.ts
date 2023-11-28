import { type PopupProps } from '@progress/kendo-react-popup';
import type React from 'react';

export interface IPopup extends PopupProps {
  children: React.ReactNode;
  onClose: () => void;
}
