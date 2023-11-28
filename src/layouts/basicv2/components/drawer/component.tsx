import React from 'react';
import { useNavigate } from 'react-router-dom';

import { usePathname } from '@/hooks/usePathname';
import { Helper } from '@/utils/Helper';

import { drawers } from './drawer';
import { type IChildItemDrawer, type IItemDrawer } from './types';
import ViewDrawer from './view';

interface IStateDrawer {
  pathLevel0: string;
  pathLevel1: string;
  pathLevel2: string;
  pathCurrent: string;
}

interface IStateCollapse {
  show: boolean;
}
enum LayerDrawer {
  layer0 = 0,
  layer1,
  layer2,
}

const ComponentDrawer = () => {
  const navigate = useNavigate();
  const path = usePathname();
  const initialStateDrawer: IStateDrawer = React.useMemo(() => {
    return {
      pathLevel0: '',
      pathLevel1: '',
      pathLevel2: '',
      pathCurrent: path,
    };
  }, [path]);
  const [state, setState] = React.useState<IStateDrawer>(initialStateDrawer);
  const [collapsed, setCollapsed] = React.useState<IStateCollapse>({ show: false });

  const handleToggleCollapse = () => {
    setCollapsed(prev => {
      return {
        show: !prev.show,
      };
    });
  };
  const handleNavigateWhenSingle = (item: IChildItemDrawer) => {
    if (Helper.isEmpty(item.children)) {
      navigate(item.path);
    }
  };
  const handleSetInitialWhenSameItem = (layer: LayerDrawer) => {
    switch (layer) {
      case LayerDrawer.layer0:
        setState(prev => {
          return {
            ...prev,
            pathLevel0: '',
          };
        });
        break;
      case LayerDrawer.layer1:
        setState(prev => {
          return {
            ...prev,
            pathLevel1: '',
          };
        });
        break;
      case LayerDrawer.layer2:
        setState(prev => {
          return {
            ...prev,
            pathLevel2: '',
          };
        });
        break;
      default:
        break;
    }
  };
  const handleGetValueLevel0 = (item: IChildItemDrawer) => {
    if (item.path === state.pathLevel0) {
      handleSetInitialWhenSameItem(LayerDrawer.layer0);
    } else {
      setState(prev => {
        return {
          ...prev,
          pathLevel0: item.path,
          pathCurrent: item.path,
        };
      });
    }
    handleNavigateWhenSingle(item);
  };
  const handleGetValueLevel1 = (item: IChildItemDrawer) => {
    if (item.path === state.pathLevel1) {
      handleSetInitialWhenSameItem(LayerDrawer.layer1);
    } else {
      setState(prev => {
        return {
          ...prev,
          pathLevel1: item.path,
          pathCurrent: item.path,
        };
      });
    }
    handleNavigateWhenSingle(item);
  };
  const handleGetValueLevel2 = (item: IChildItemDrawer) => {
    if (item.path === state.pathLevel2) {
      handleSetInitialWhenSameItem(LayerDrawer.layer2);
    } else {
      setState(prev => {
        return {
          ...prev,
          pathLevel2: item.path,
          pathCurrent: item.path,
        };
      });
    }
    handleNavigateWhenSingle(item);
  };
  const findActiveHaveChild = (path: string, drawer: IItemDrawer[]) => {
    return drawer.find(layer0 => layer0.children.find(layer1 => layer1.children?.find(layer2 => layer2.path === path)));
  };

  const createIdPathWhenChangeRoute = (path: string) => {
    const item = findActiveHaveChild(path, drawers);
    if (item) {
      const level0 = item?.children.find(level0 => level0.children?.find(level1 => level1.path === path));
      setState(prev => {
        return {
          ...prev,
          pathLevel0: level0?.path || '',
        };
      });

      if (level0) {
        const level1 = level0?.children?.find(layer1 => layer1.path === path);
        setState(prev => {
          return {
            ...prev,
            pathLevel1: level1?.path || '',
          };
        });
        if (level1) {
          const level2 = level1?.children?.find(layer3 => layer3.path === path);
          setState(prev => {
            return {
              ...prev,
              pathLevel2: level2?.path || '',
            };
          });
        }
      }
    }
  };
  React.useEffect(() => {
    createIdPathWhenChangeRoute(path);
  }, []);

  return (
    <ViewDrawer
      level0Active={state.pathLevel0}
      level1Active={state.pathLevel1}
      currentActive={state.pathCurrent}
      onToggleMenuLevel0={handleGetValueLevel0}
      onToggleMenuLevel1={handleGetValueLevel1}
      onToggleMenuLevel2={handleGetValueLevel2}
      collapse={collapsed.show}
      onToggleCollapse={handleToggleCollapse}
    />
  );
};

export default ComponentDrawer;
