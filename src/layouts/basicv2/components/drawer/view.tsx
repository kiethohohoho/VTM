import React from 'react';

import DrawerCollapseNotShow from './components/drawerCollapseNotShow';
import DrawerCollapseShow from './components/drawerCollapseShow';
import { type IChildItemDrawer } from './types';

export interface IViewDrawer {
  onToggleCollapse: () => void;
  level0Active: string;
  level1Active: string;
  currentActive: string;
  collapse: boolean;
  onToggleMenuLevel0: (path: IChildItemDrawer) => void;
  onToggleMenuLevel1: (path: IChildItemDrawer) => void;
  onToggleMenuLevel2: (path: IChildItemDrawer) => void;
}

const ViewDrawer: React.FC<IViewDrawer> = ({ collapse, onToggleCollapse, ...other }) => {
  return (
    <div
      style={{
        width: '100%',
        minWidth: collapse ? '5rem' : '16rem',
      }}
      className={`flex flex-column h-full ${!collapse && 'overflow-hidden'}`}>
      <div
        style={{
          width: '100%',
          maxWidth: collapse ? '5rem' : '16rem',
          boxShadow: '4px 1px 1px rgba(0, 0, 0, 0.16)',
        }}
        className='fixed'>
        <div
          className={`${!collapse && 'overflow-y-auto scroll'}`}
          style={{
            height: collapse ? 'calc(100dvh - 122px)' : 'calc(100dvh - 125px)',
          }}>
          {collapse ? <DrawerCollapseNotShow {...other} /> : <DrawerCollapseShow {...other} />}
        </div>
        <div
          className='p-5 cursor-pointer hover:bg-neutral-30 flex justify-center items-center border-t border-solid border-neutral-40'
          onClick={onToggleCollapse}>
          <span
            style={{
              transform: collapse ? 'rotate(-90deg)' : 'rotate(90deg)',
            }}
            className='k-icon k-i-download'
          />
          {!collapse && <span className='text-sm px-5'>Collapsed View</span>}
        </div>
      </div>
    </div>
  );
};

export default ViewDrawer;
