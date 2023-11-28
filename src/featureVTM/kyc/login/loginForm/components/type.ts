import { type SyntheticEvent } from 'react';

export interface actionModalQrProps {
  handleCloseModalQr?: (e?: React.MouseEvent<Element, MouseEvent> | undefined) => void;
  handleSubmit?: (values: Record<string, any>, event?: SyntheticEvent<any, Event> | undefined) => void;
  visibleModalQr?: boolean;
  width?: string | number | undefined;
}
