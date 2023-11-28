import { type IImportProductModel } from '@/layouts/dialog/importGoodsBarCode/types';

export interface IDataTabsCard {
  idOther: number;
  data: any[];
}
export interface IResponseProducts {}
export interface IResponseOrders {}
export enum ActionAPI {
  default = 0,
  searchBarcode = 1,
  checkConsumer,
  orderGoods,
}
export interface IPOS {
  carts: Array<{
    products: any[];
    consumer: any;
    loading: boolean;
  }>;
  cartActive: number;
}
export interface IFormSearchBarcode {
  barcode: string;
}
export interface IFormCheckConsumer {
  phone: string;
}

export interface IResponseSearchBarcodeItem extends IImportProductModel {}
