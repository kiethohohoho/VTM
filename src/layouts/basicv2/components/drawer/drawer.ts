import { EnumPath } from '@/utils/Enums';

import { type IItemDrawer } from './types';

export const drawers: IItemDrawer[] = [
  {
    children: [
      {
        icon: 'back-element',
        path: '/',
        label: 'dashboard',
      },
    ],
  },
  {
    children: [
      {
        icon: 'inbox',
        label: 'product',
        path: EnumPath.PRODUCT,
      },
    ],
  },
  {
    children: [
      {
        icon: 'tell-a-friend',
        label: 'consumer.title',
        path: EnumPath.CONSUMER,
      },
    ],
  },
  {
    children: [
      {
        icon: 'cart',
        label: 'order.title',
        path: EnumPath.ORDER,
      },
    ],
  },

  {
    children: [
      {
        icon: 'myspace',
        label: 'staff',
        path: EnumPath.STAFF,
      },
    ],
  },
  {
    children: [
      {
        icon: 'delicious-box',
        label: 'pos',
        path: EnumPath.POS,
      },
    ],
  },
];
