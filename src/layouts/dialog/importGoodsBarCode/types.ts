export interface IWarehouse {
  warehouseId: string;
  storeId: string;
  name: string;
  address: string;
  status: string;
  modifiedAt: number;
  modifiedBy: string;
}

export interface IGoodsModel {
  goodsId: string;
  sku: string;
  quantityAvailable: number;
  price: number;
  warehouseId: string;
  productDictionaryId: string;
}
export interface IProductDictionaryModel {
  productDictionaryId: string;
  name: string;
  code: string;
  description: string;
  images: string;
  status: number;
  skuModel: {
    skuId: string;
    productDictionaryId: string;
    sku: string;
    name: string;
    barcode: string;
    goodsModel?: IGoodsModel;
  };
}

export interface IRetailerProductModel {
  retailerProductId: string;
  retailerProductName: string;
  description: string;
  images: string;
  status: number;
  skuModel: {
    skuVariationIncluded: string;
    description: string;
    barcode: string;
    goodsModel?: IGoodsModel;
  };
}

export interface IImportProductModel {
  productDictionaryModel?: IProductDictionaryModel;
  retailerProductModel?: IRetailerProductModel;
  productSource: number;
}

export interface IStandardImportProductModel {
  productId: string;
  sku: string;
  images: string;
  name: string;
  goodsModel?: IGoodsModel;
}
