import React, { useState } from 'react';

import { Localize } from '@/context/languages';

import { type ITabs } from './types';

interface ITabsRoot {
  className?: string;
  classNameTabs?: string;
  classNameComponent?: string;
  tabs: ITabs[];
  tabDefault?: number;
}

interface IStateTabsRoot {
  tab: number;
}

const TabsRoot: React.FC<ITabsRoot> = ({
  children,
  className,
  classNameComponent,
  classNameTabs,
  tabs,
  tabDefault,
}) => {
  const initialStateTabsRoot: IStateTabsRoot = React.useMemo(() => {
    return {
      tab: tabDefault || 0,
    };
  }, [tabDefault]);

  const [state, setState] = useState<IStateTabsRoot>(initialStateTabsRoot);

  const handleChangeTab = (idTab: number) => {
    setState({ tab: idTab });
  };

  return (
    <div className='flex flex-column gap-5'>
      <div className={classNameTabs}>
        <ul className='list-none flex px-10 my-0 gap-3'>
          {tabs.map((tab, index) => {
            const isActive = tab.id === state.tab;
            return (
              <li
                onClick={() => {
                  handleChangeTab(tab.id);
                }}
                key={TabsRoot.name + index.toString()}
                content=''
                className={`flex items-center relative text-lg text-bold cursor-pointer ${
                  !isActive && 'hover:text-primary-hover'
                } py-3 rounded-xl ${
                  isActive &&
                  'text-primary before:absolute before:w-full before:h-1 before:bg-primary before:bottom-0 before:left-0 before:left-0'
                }`}
                style={{
                  minWidth: 100,
                }}>
                {tab.icon && <span className={`k-icon k-i-${tab.icon} pr-3`} />}
                <Localize tid={tab.title} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classNameComponent}>{tabs[state.tab].component}</div>
    </div>
  );
};

export default TabsRoot;
