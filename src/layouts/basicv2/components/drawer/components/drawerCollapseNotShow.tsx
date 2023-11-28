import React from 'react';

import { Localize } from '@/context/languages';

import { drawers } from '../drawer';
import { type IViewDrawer } from '../view';

interface IDrawerCollapseNotShow extends Omit<IViewDrawer, 'collapse' | 'onToggleCollapse'> {}

const DrawerCollapseNotShow: React.FC<IDrawerCollapseNotShow> = ({
  currentActive,
  level0Active,
  level1Active,
  onToggleMenuLevel0,
  onToggleMenuLevel1,
  onToggleMenuLevel2,
}) => {
  return (
    <div className='flex flex-column justify-center py-5'>
      {drawers.map((item, index) => {
        return (
          <ul
            key={DrawerCollapseNotShow.name + index.toString()}
            className='list-none px-0 m-0 text-center'>
            {item.children.map((level0, idx0) => {
              return (
                <li
                  className='relative group'
                  key={DrawerCollapseNotShow.name + idx0.toString() + 'level0'}>
                  <span
                    onClick={() => {
                      !level0.children && onToggleMenuLevel0(level0);
                    }}
                    className={`p-4 k-icon k-i-${level0.icon} hover:bg-neutral-30 cursor-pointer rounded-xl`}
                  />
                  <ul
                    style={{
                      transform: 'translateX(88px)',
                      minWidth: '200px',
                    }}
                    content=''
                    className='absolute top-0 group-hover:z-10 bg-white list-none px-0 m-0 border border-solid border-neutral-50 rounded-xl'>
                    <div
                      style={{
                        transform: 'rotate(45deg)',
                        left: '-5px',
                        boxShadow: '-1px 1px 1px #c2c2c2',
                      }}
                      className='w-3 h-3 bg-white absolute top-5'
                    />
                    <div
                      style={{
                        transform: 'translateX(-8px)',
                      }}
                      className='absolute bg-transparent w-2 h-full left-0'
                    />
                    <li
                      className={`${
                        level0.children && 'border-b border-solid'
                      } py-4 px-6 border-neutral-50 uppercase text-start`}>
                      <Localize tid={level0.label} />
                    </li>
                    {level0.children?.map((level1, idx1) => {
                      const length = (level0.children && level0.children.length) || 0;
                      const isLast = idx1 === length - 1;
                      return (
                        <li
                          style={{
                            borderRadius: isLast ? '0 0 12px 12px' : '0px',
                          }}
                          onClick={() => {
                            onToggleMenuLevel1(level1);
                          }}
                          key={DrawerCollapseNotShow.name + idx1.toString() + 'level1'}
                          className='py-3 px-6 hover:bg-neutral-30 cursor-pointer text-start text-xs'>
                          <Localize tid={level1.label} />
                          <ul>
                            {level1.children?.map((level2, idx2) => {
                              return (
                                <li
                                  className='text-xs'
                                  key={DrawerCollapseNotShow.name + idx2.toString() + 'level2'}>
                                  <Localize tid={level2.label} />
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default DrawerCollapseNotShow;
