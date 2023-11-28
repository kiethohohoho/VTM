import { useState } from 'react';

export const useModalCommon = (defaultValue: boolean = false) => {
  const [visible, setVisible] = useState<boolean>(defaultValue);

  const openModal = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    setVisible(true);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    setVisible(false);
  };

  return {
    visible,
    openModal,
    closeModal,
  };
};
