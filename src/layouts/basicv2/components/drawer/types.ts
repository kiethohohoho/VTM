export interface IChildItemDrawer {
  icon?: string;
  label: string;
  path: string;
  children?: IChildItemDrawer[];
}

export interface IItemDrawer {
  groupName?: string;
  children: IChildItemDrawer[];
}

export enum LayerDrawer {
  layer0 = 0,
  layer1,
  layer2,
}
