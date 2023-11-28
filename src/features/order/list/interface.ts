export interface IList {
  list: IListItem[];
  total: number;
}

export interface IListItem {
  groupStaffId: string;
  storeId: string;
  name: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
}
export interface IFilter {
  order: string;
  by: string;
  from: number;
  limit: number;
  filter?: string;
  filterValue?: string;
  search?: string;
  searchValue?: string;
}
