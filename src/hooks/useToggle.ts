import { useState } from 'react';

export const useToggleCommon = (initialValue: boolean) => {
  const [isEnable, setIsEnable] = useState(initialValue);

  const onEnable = () => {
    setIsEnable(true);
  };

  const onDisable = () => {
    setIsEnable(false);
  };

  const onToggle = () => {
    setIsEnable(!isEnable);
  };

  return {
    isEnable,
    onEnable,
    onDisable,
    onToggle,
    setIsEnable,
  };
};
