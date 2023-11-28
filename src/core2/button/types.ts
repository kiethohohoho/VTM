import { type ButtonProps } from '@progress/kendo-react-buttons';
import { type LoaderThemeColor } from '@progress/kendo-react-indicators';

export interface IButtonRoot extends ButtonProps {
  text?: string;
  loading?: boolean;
  loadingThemeColor?: LoaderThemeColor;
}
