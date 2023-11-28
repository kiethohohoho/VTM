import React from 'react';

import { drawers } from '../drawer';
import { type IViewDrawer } from '../view';
import { LIDrawer, ULDrawer } from './item';

interface IDrawerCollapseShow extends Omit<IViewDrawer, 'collapse' | 'onToggleCollapse'> {}

const DrawerCollapseShow: React.FC<IDrawerCollapseShow> = ({
  currentActive,
  level0Active,
  level1Active,
  onToggleMenuLevel0,
  onToggleMenuLevel1,
  onToggleMenuLevel2,
}) => {
  return (
    <div className='p-4'>
      {drawers.map((item, index) => {
        return (
          <ULDrawer
            key={DrawerCollapseShow.name + index.toString()}
            className='px-0'
            groupName={item.groupName}>
            {item.children.map((level0, idx1) => {
              const isActiveLevel0 = level0.path === level0Active;
              return (
                <LIDrawer
                  key={DrawerCollapseShow.name + idx1.toString() + 'level0'}
                  onToggle={onToggleMenuLevel0}
                  active={currentActive}
                  item={level0}>
                  <ULDrawer
                    className='overflow-hidden'
                    style={{
                      height: isActiveLevel0 ? `${32 * (level0.children?.length || 0)}px` : 0,
                      transition: 'height 0.4s',
                    }}>
                    {level0.children?.map((level1, idx1) => {
                      const isActiveLevel1 = level1.path === level1Active;
                      return (
                        <LIDrawer
                          layerChild
                          key={DrawerCollapseShow.name + idx1.toString() + 'level1'}
                          active={currentActive}
                          item={level1}
                          onToggle={onToggleMenuLevel1}>
                          <ULDrawer
                            style={{
                              height: isActiveLevel1 ? `${32 * (level1.children?.length || 0)}px` : 0,
                              transition: 'height 0.4s',
                            }}>
                            {level1.children?.map((level2, idx2) => {
                              return (
                                <LIDrawer
                                  layerChild
                                  key={DrawerCollapseShow.name + idx1.toString() + 'level1'}
                                  item={level2}
                                  active={currentActive}
                                  onToggle={onToggleMenuLevel2}
                                />
                              );
                            })}
                          </ULDrawer>
                        </LIDrawer>
                      );
                    })}
                  </ULDrawer>
                </LIDrawer>
              );
            })}
          </ULDrawer>
        );
      })}
    </div>
  );
};

export default DrawerCollapseShow;
