export interface IList {
  list: IListItem[];
  total: number;
}

export interface IListItem {
  storeId: string;
  name: string;
  taxNumber: string;
  classification: string;
  license: string;
  address: string;
  cover: string;
  photo: string;
  status: number;
  modifiedAt: number;
  modifiedBy: string;
  userId: string;
  shopName: string;
  description: string;
}
export interface IFilter {
  order: string;
  by: string;
  from: number;
  limit: number;
  filter?: string;
  filterValue?: string;
}

export interface IGood {
  goodsId: string;
  name: string;
  sku: string;
  barcode: string;
  quantityAvailable: number;
  warehouseId: string;
  productDictionaryId: string;
  isO2O: number;
  status: number;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
}

export interface IResponseGetListGood {
  list: IGood[];
  total: number;
}
