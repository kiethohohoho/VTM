import React, { type CSSProperties } from 'react';

import { Localize } from '@/context/languages';

import { type IChildItemDrawer } from '../types';
interface IULDrawer {
  className?: string;
  groupName?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}
const ULDrawer: React.FC<IULDrawer> = ({ className, groupName, children, style }) => {
  return (
    <ul
      style={style}
      className={`list-none my-0 ${className}`}>
      {groupName && (
        <div
          style={{
            fontSize: '10px',
          }}
          className='mb-2 text-neutral-60 font-medium px-4 uppercase mt-3'>
          <Localize tid={groupName} />
        </div>
      )}
      {children}
    </ul>
  );
};

interface ILIDrawer {
  item: IChildItemDrawer;
  onToggle: (item: IChildItemDrawer) => void;
  children?: React.ReactNode;
  active?: string;
  className?: string;
  style?: CSSProperties;
  layerChild?: boolean;
}
const LIDrawer: React.FC<ILIDrawer> = ({ active, onToggle, item, children, className, style, layerChild }) => {
  const isActive = active === item.path;
  return (
    <li>
      <div
        onClick={() => {
          onToggle(item);
        }}
        style={style}
        className={`text-xs h-8 flex items-center hover:bg-neutral-30 px-4 rounded-lg cursor-pointer text-neutral-70 ${className}`}>
        {!layerChild && item.children && (
          <div className='w-5'>
            <span
              style={{
                fontSize: '12px',
              }}
              className='k-icon k-i-arrow-60-down'
            />
          </div>
        )}
        {/* {item.icon && <span className={`k-icon k-i-${item.icon} ${isActive && 'text-primary'}`} />} */}
        <span
          style={{
            fontSize: '13px',
          }}
          className={`px-3 ${isActive ? 'text-primary' : 'text-neutral-100'}`}>
          <Localize tid={item.label} />
        </span>
      </div>
      {children}
    </li>
  );
};
export { LIDrawer, ULDrawer };
