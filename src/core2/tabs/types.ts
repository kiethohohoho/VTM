import type React from 'react';

export interface ITabs<T = any> {
  component: React.ReactNode;
  title: string;
  id: T;
  icon?: string;
  labelCustom?: (title: string, id: T) => React.ReactNode;
}
