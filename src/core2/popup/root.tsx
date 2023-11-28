import { type Align, Popup, type PopupAnimation } from '@progress/kendo-react-popup';
import React from 'react';

import { type IPopup } from './types';

const animateDefault: PopupAnimation = {
  closeDuration: 0,
  openDuration: 0,
};
const anchorAlignSetting: Align = {
  horizontal: 'center',
  vertical: 'bottom',
};
const popupAlignSetting: Align = {
  horizontal: 'right',
  vertical: 'top',
};

const PopupRoot: React.FC<IPopup> = ({
  children,
  animate = animateDefault,
  anchorAlign = anchorAlignSetting,
  onClose,
  show,
  popupAlign = popupAlignSetting,
  ...other
}) => {
  return (
    <React.Fragment>
      <Popup
        show={show}
        anchorAlign={anchorAlign}
        popupAlign={popupAlign}
        animate={animate}
        {...other}>
        {children}
      </Popup>
      {show && (
        <div
          className='fixed bg-transparent w-full h-full right-0 top-0'
          onClick={onClose}
        />
      )}
    </React.Fragment>
  );
};

export default PopupRoot;
